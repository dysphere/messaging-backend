-- AlterTable
CREATE SEQUENCE user_profileid_seq;
ALTER TABLE "User" ALTER COLUMN "profileId" SET DEFAULT nextval('user_profileid_seq');
ALTER SEQUENCE user_profileid_seq OWNED BY "User"."profileId";
