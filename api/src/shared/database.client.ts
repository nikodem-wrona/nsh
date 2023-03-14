import { Client as PGClient } from 'pg';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseClient implements OnModuleInit, OnModuleDestroy {
  public client: PGClient;

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    this.client = new PGClient({
      connectionString: this.configService.get('DATABASE_URL'),
    });

    void this.client.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.end();
  }
}
