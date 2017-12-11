import * as sqlite from 'sqlite3';

export class DatabaseAccessor {

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