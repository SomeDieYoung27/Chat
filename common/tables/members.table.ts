import { bigint, index, pgEnum, pgTable, unique } from "drizzle-orm/pg-core";
import { baseSchema } from "./base";
import { groupsTable } from "./groups.table";
import { usersTable } from "./users.table";

export const memberRoleEnum = pgEnum("member_role", [
  "member",
  "admin",
  "owner",
]);

export const membersTable = pgTable(
  "members",
  {
    ...baseSchema,
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => usersTable.id),
    groupId: bigint("group_id", { mode: "number" })
      .notNull()
      .references(() => groupsTable.id, { onDelete: "cascade" }),
    role: memberRoleEnum("role").notNull().default("member"),
  },
  (table) => ({
    uniqueUserGroupIndex: unique().on(table.userId, table.groupId),
    userIndex: index().on(table.userId),
    groupIndex: index().on(table.groupId),
  })
);
export const MemberRoles = memberRoleEnum.enumValues;
export type Member = typeof membersTable.$inferSelect;
export type MemberRole = Member["role"];
