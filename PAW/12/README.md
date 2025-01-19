Myslałem że 12 ma być połączone z api blogowym które pisaliśmy jakiś czas temu.

Żeby 12/12 działało, to 11/7_tsc musi być odpalone (baza danych mysql z xamppa),
w 11/7_tsc trzeba dodać .env z bazą danych (mysql://root@localhost:3306/forummc),
potem prisma generate i prisma migrate dev, chyba migracje też trzeba wywalić nie wiem
