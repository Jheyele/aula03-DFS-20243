-- CreateTable
CREATE TABLE "agendamentos" (
    "id" TEXT NOT NULL,
    "servico" VARCHAR(128) NOT NULL,
    "data" DATE NOT NULL,
    "hora" TIME(6) NOT NULL,
    "teste" TEXT,
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "telefone" VARCHAR(20),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "fk_cliente" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
