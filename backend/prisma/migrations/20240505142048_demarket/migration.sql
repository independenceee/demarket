/*
  Warnings:

  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nft_id` on the `Comments` table. All the data in the column will be lost.
  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nft_id` on the `Like` table. All the data in the column will be lost.
  - The primary key for the `Likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nft_id` on the `Likes` table. All the data in the column will be lost.
  - You are about to drop the `CartNft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nft` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Product_id` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Product_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Product_id` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartNft" DROP CONSTRAINT "CartNft_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "CartNft" DROP CONSTRAINT "CartNft_nft_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_nft_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_nft_id_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_nft_id_fkey";

-- DropForeignKey
ALTER TABLE "Nft" DROP CONSTRAINT "Nft_author_address_fkey";

-- DropForeignKey
ALTER TABLE "Nft" DROP CONSTRAINT "Nft_current_address_fkey";

-- DropForeignKey
ALTER TABLE "Nft" DROP CONSTRAINT "Nft_seller_address_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey",
DROP COLUMN "nft_id",
ADD COLUMN     "Product_id" TEXT NOT NULL,
ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("account_id", "Product_id");

-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
DROP COLUMN "nft_id",
ADD COLUMN     "Product_id" TEXT NOT NULL,
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("account_id", "Product_id");

-- AlterTable
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_pkey",
DROP COLUMN "nft_id",
ADD COLUMN     "Product_id" TEXT NOT NULL,
ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("account_id", "Product_id");

-- DropTable
DROP TABLE "CartNft";

-- DropTable
DROP TABLE "Nft";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "policy_id" TEXT,
    "asset_name" TEXT,
    "fingerprint" TEXT,
    "price" TEXT,
    "royalties" TEXT,
    "author_address" TEXT,
    "seller_address" TEXT,
    "current_address" TEXT,
    "author_stake_address" TEXT,
    "seller_stake_address" TEXT,
    "current_stake_address" TEXT,
    "medadata" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartProduct" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cart_id" TEXT NOT NULL,
    "Product_id" TEXT NOT NULL,

    CONSTRAINT "CartProduct_pkey" PRIMARY KEY ("cart_id","Product_id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_current_address_fkey" FOREIGN KEY ("current_address") REFERENCES "Account"("wallet_address") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_seller_address_fkey" FOREIGN KEY ("seller_address") REFERENCES "Account"("wallet_address") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_author_address_fkey" FOREIGN KEY ("author_address") REFERENCES "Account"("wallet_address") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_Product_id_fkey" FOREIGN KEY ("Product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_Product_id_fkey" FOREIGN KEY ("Product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_Product_id_fkey" FOREIGN KEY ("Product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_Product_id_fkey" FOREIGN KEY ("Product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
