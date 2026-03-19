import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const workTypes = await Promise.all([
    prisma.workType.upsert({where: {name: 'Кладка перегородок'}, update: {},create: {name: 'Кладка перегородок', unit:'м²'} }),
    prisma.workType.upsert({where: {name: 'Монтаж опалубки'}, update: {},create: {name: 'Монтаж опалубки', unit:'м²'} }),
    prisma.workType.upsert({where: {name: 'Заливка бетонв'}, update: {},create: {name: 'Заливка бетонв', unit:'м²'} }),
    prisma.workType.upsert({where: {name: 'Армирование'}, update: {},create: {name: 'Армирование', unit:'м²'} }),
    prisma.workType.upsert({where: {name: 'Монтаж перекрытий'}, update: {},create: {name: 'Монтаж перекрытий', unit:'м²'} }),
    prisma.workType.upsert({where: {name: 'Штукатурные работы'}, update: {},create: {name: 'Штукатурные работы', unit:'м²'} }),
    prisma.workType.upsert({where: {name: 'Гидроизоляция'}, update: {},create: {name: 'Гидроизоляция', unit:'м²'} }),
    prisma.workType.upsert({where: {name: 'Монтаж кровли'}, update: {},create: {name: 'Монтаж кровли', unit:'м²'} }),
  ]);

const executors = [
  'Иванов Артём Викторович',
  'Петров Сергей Николаевич',
  'Сидоров Дмитрий Константинович',
  'Козлов Михаил Романович',
  'Новиков Павел Андреевич',
];
  const entries = [
    { date: '2026-03-01', workTypeId: workTypes[0].id, volume: 24, executorName: executors[0], notes: 'Выполнено по плану' },
    { date: '2026-03-01', workTypeId: workTypes[2].id, volume: 12.5, executorName: executors[1] },
    { date: '2026-03-02', workTypeId: workTypes[1].id, volume: 48, executorName: executors[2] },
    { date: '2026-03-03', workTypeId: workTypes[3].id, volume: 2.4, executorName: executors[0] },
    { date: '2026-03-04', workTypeId: workTypes[4].id, volume: 36, executorName: executors[3], notes: 'Задержка из-за погоды' },
    { date: '2026-03-05', workTypeId: workTypes[5].id, volume: 60, executorName: executors[1] },
    { date: '2026-03-06', workTypeId: workTypes[0].id, volume: 18, executorName: executors[4] },
    { date: '2026-03-07', workTypeId: workTypes[6].id, volume: 30, executorName: executors[2] },
    { date: '2026-03-08', workTypeId: workTypes[7].id, volume: 45, executorName: executors[0], notes: 'Ускоренный темп' },
    { date: '2026-03-10', workTypeId: workTypes[2].id, volume: 8.3, executorName: executors[3] },
    { date: '2026-03-11', workTypeId: workTypes[1].id, volume: 22, executorName: executors[1] },
    { date: '2026-03-12', workTypeId: workTypes[3].id, volume: 3.1, executorName: executors[4] },
    { date: '2026-03-13', workTypeId: workTypes[5].id, volume: 75, executorName: executors[0] },
    { date: '2026-03-14', workTypeId: workTypes[4].id, volume: 50, executorName: executors[2], notes: 'Сверхурочные работы' },
    { date: '2026-03-15', workTypeId: workTypes[0].id, volume: 28, executorName: executors[3] },
  ];

  for (const entry of entries) {
    await prisma.entry.create({
      data: {...entry, date: new Date(entry.date)},
    });
  }
  console.log('seed completed')
}
main().catch(console.error).finally(() => prisma.$disconnect());