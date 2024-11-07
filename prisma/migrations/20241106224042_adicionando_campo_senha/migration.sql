/*
  Warnings:

  - You are about to drop the column `cliente_id` on the `agendamentos` table. All the data in the column will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuario_id` to the `agendamentos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "usuario_perfil" AS ENUM ('ADMIN', 'CLIENTE', 'FUNCIONARIO');

-- DropForeignKey
ALTER TABLE "agendamentos" DROP CONSTRAINT "fk_cliente";

-- AlterTable
ALTER TABLE "agendamentos" DROP COLUMN "cliente_id",
ADD COLUMN     "usuario_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "clientes";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil" "usuario_perfil" NOT NULL DEFAULT 'CLIENTE',
    "telefone" VARCHAR(20),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "fk_cliente" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
