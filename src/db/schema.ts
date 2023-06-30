import { relations } from "drizzle-orm"
import { decimal, pgTable, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  firstname: varchar("first_name"),
  lastname: varchar("last_name"),
})

export const usersRelations = relations(users, ({ many }) => ({
  portfolios: many(portfolios),
}))

export const portfolios = pgTable(
  "portfolios",
  {
    id: uuid("id").primaryKey(),
    userId: uuid("user_id").references(() => users.id),
    name: varchar("name"),
  },
  (portfolios) => {
    return {
      uniqueIdx: uniqueIndex("portfolio_name_unique_idx").on(portfolios.name),
    }
  },
)

export const portfoliosRelations = relations(portfolios, ({ one, many }) => ({
  user: one(users, {
    fields: [portfolios.userId],
    references: [users.id],
  }),
  positions: many(positions),
}))

export const positions = pgTable("positions", {
  id: uuid("id").primaryKey(),
  portfolioId: uuid("portfolio_id").references(() => portfolios.id),
  ticker: varchar("ticker"),
  amount: decimal("amount", { precision: 100, scale: 2 }),
})

export const positionsRelations = relations(positions, ({ one }) => ({
  portfolio: one(portfolios, {
    fields: [positions.portfolioId],
    references: [portfolios.id],
  }),
}))
