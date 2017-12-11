import * as sqlite from 'sqlite3';

export interface IDatabaseAccessor {
    Execute(query: string): Promise<any>;
}

export class DatabaseAccessor implements IDatabaseAccessor {

    constructor(private connectionString: string) {

    }


    async Execute(query: string) {
        let db = new sqlite.Database(this.connectionString);

        return new Promise((resolve, reject) => {
            db.all(query, (error, rows) => {

                if (error) {
                    reject(error);
                }

                resolve(rows);
                db.close();
            });
        });

    }
}