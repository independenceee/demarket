/*
  Warnings:

  - Made the column `policy_id` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `asset_name` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "policy_id" SET NOT NULL,
ALTER COLUMN "asset_name" SET NOT NULL;
