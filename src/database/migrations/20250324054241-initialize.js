'use strict';

let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
export function setup(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
}

export async function up(db) {
  await db.createTable('users', {
    user_id: {
      type: 'string',
      primaryKey: true,
      unique: true
    },
    username: {
      type: 'string',
      unique: true,
      notNull: true
    },
    email: {
      type: 'string',
      unique: true,
      notNull: true
    },
    profileimg: {
      type: 'string',
    },
    password: {
      type: 'string',
      notNull: true
    },
  });
  console.log("Table 'users' created successfully.");


  await db.createTable('todos', {
    user_id: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'posts_user_id_fk',
        table: 'users',
        mapping: 'user_id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    todo_id: {
      type: 'string',
      primaryKey: true,
      unique: true
    },
    title: {
      type: 'string',
      unique: true,
      notNull: true
    },
    content: {
      type: 'text',
      notNull: true
    },
    completed: {
      type: 'boolean',
      defaultValue: false
    },
    created_at: {
      type: 'string',
      defaultValue: new String('CURRENT_TIMESTAMP'),
      notNull: true
    }
  });
  console.log("Table 'todos' created successfully.");
}

export async function down(db) {

  await db.dropTable('todos');
  console.log("Table 'todos' dropped successfully.");

  await db.dropTable('users');
  console.log("Table 'users' dropped successfully.");
}

export const _meta = {
  version: 1
};
