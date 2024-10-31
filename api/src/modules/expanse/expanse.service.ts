import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PrismaService } from 'nestjs-prisma';
import 'dayjs/locale/pt-br';
import { PluggyClient, Transaction } from 'pluggy-sdk';
dayjs().locale('pt-br');

@Injectable()
export class ExpanseService {
  private pluggyClient: PluggyClient;
  constructor(private prisma: PrismaService) {
    this.pluggyClient = new PluggyClient({
      clientId: process.env.PLUGGY_CLIENT_ID,
      clientSecret: process.env.PLUGGY_CLIENT_SECRET,
    });
  }
  async getMonthExpansesFromApi() {
    const m = dayjs().month();
    const lastDay = dayjs(m).daysInMonth();
    const monthBaseString = `${dayjs().year()}-${m + 1}`;

    const { results, ...transactions } =
      await this.pluggyClient.fetchTransactions(process.env.ACCOUNT_ID, {
        from: `${monthBaseString}-01`,
        to: `${monthBaseString}-${dayjs(m).daysInMonth()}`,
      });

    const fortmattedData = results.map(
      (
        r: Transaction & {
          operationType: string;
          createdAt: string;
          updatedAt: string;
        },
      ) => {
        return {
          id: r.id,
          description: r.description,
          descriptionRaw: r.descriptionRaw,
          currencyCode: r.currencyCode,
          amount: r.amount,
          date: r.date,
          category: r.category,
          categoryId: Number(r.categoryId),
          accountId: r.accountId,
          status: r.status,
          type: r.type,
          operationType: r.operationType,
          createdAt: r?.createdAt,
          updatedAt: r?.updatedAt,
        };
      },
    );
    await this.prisma.transaction.createMany({
      data: fortmattedData,
    });
    return { message: 'fetchTransactions from month' };
  }
  async getAuthToken() {
    await this.pluggyClient.createConnectToken();
  }
}
