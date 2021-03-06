/**
 * Nanocloud turns any traditional software into a cloud solution, without
 * changing or redeveloping existing source code.
 *
 * Copyright (C) 2016 Nanocloud Software
 *
 * This file is part of Nanocloud.
 *
 * Nanocloud is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * Nanocloud is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General
 * Public License
 * along with this program.  If not, see
 * <http://www.gnu.org/licenses/>.
 */

function up(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('team', (table) => {
      table.string('id').primary();
      table.string('username');
      table.string('password');
      table.string('name').unique();

      table.dateTime('createdAt');
      table.dateTime('updatedAt');
    }),

    knex.schema.table('user', (user) => {
      user.string('team').references('team.id').onDelete('SET NULL').onUpdate('CASCADE');
      user.boolean('isTeamAdmin');
    }),

    knex.schema.table('pendinguser', (pendinguser) => {
      pendinguser.string('team').references('team.id').onDelete('SET NULL').onUpdate('CASCADE');
      pendinguser.boolean('isTeamAdmin');
    })
  ]);
}

function down(knex, Promise) {
  return Promise.all([
    knex.schema.table('user', (user) => {
      user.dropColumn('team');
      user.dropColumn('isTeamAdmin');
    }),

    knex.schema.table('pendinguser', (pendingUser) => {
      pendingUser.dropColumn('team');
      pendingUser.dropColumn('isTeamAdmin');
    }),

    knex.schema.dropTable('team')
  ]);
}

module.exports = { up, down };
