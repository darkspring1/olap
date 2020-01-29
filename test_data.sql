delete from public.f_sales;
delete from public.d_regions;
delete from public.d_times;
delete from public.d_products;

INSERT INTO public.d_regions (id, country, city) VALUES('49F8916B-4427-4750-AB15-83FFC3350FDC', 'Russia', 'Moscow');
INSERT INTO public.d_regions (id, country, city) VALUES('7648EC51-92FB-4486-AC44-F187DB207AFC', 'USA', 'NY');

/*========*/
INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('0ECC5D6F-283D-416D-83DB-EDF0724698CB', 1, 'tu', 1, 'jan', 1, 2019);

INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('AE9C46B3-C4F0-48D2-89F7-7EA727080305', 2, 'we', 1, 'jan', 1, 2019);

INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('B3AA6D55-2E7C-4AB6-B958-A8470856075A', 3, 'th', 1, 'jan', 1, 2019);

INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('39371692-8486-4D88-ABE9-F321B19B264C', 4, 'ft', 1, 'jan', 1, 2019);



INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('20FBEBD7-E494-4983-819E-411EA7C96C9D', 1, 'fr', 2, 'feb', 1, 2019);

INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('3C251D2E-9170-4D07-B91E-027078C0B483', 2, 'sa', 2, 'feb', 1, 2019);

INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('92ADD3E2-938E-4027-A566-6B23C8492933', 3, 'su', 2, 'feb', 1, 2019);

INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('A5033762-6785-427B-860C-F817EEBAE031', 4, 'mo', 2, 'feb', 1, 2019);



INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('6C049725-98C8-41E4-BD06-E2D8DF0D1C51', 1, 'we', 1, 'jan', 1, 2020);

INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('853D15A9-1513-4091-AD7C-71A9A0E4EE6D', 2, 'th', 1, 'jan', 1, 2020);

INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('20A8EFFC-7B12-4055-867A-598BE8E13AC3', 3, 'fr', 1, 'jan', 1, 2020);

INSERT INTO public.d_times (id, "day", day_desc, "month", month_desc, "quarter", "year")
VALUES('AEF43F68-9560-45B4-A896-F05A57D3D94E', 4, 'sa', 1, 'jan', 1, 2020);

/*========*/

INSERT INTO public.d_products (id, "name")
VALUES('DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 'beer');

/*========*/

--russia 2020 jan
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('79E01F50-80E2-4EE2-B4E8-B395AC85406C', '6C049725-98C8-41E4-BD06-E2D8DF0D1C51', '49F8916B-4427-4750-AB15-83FFC3350FDC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 20, 1000);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('7E575132-5E5E-4BD7-BB8B-2DB81BA9BFA3', '853D15A9-1513-4091-AD7C-71A9A0E4EE6D', '49F8916B-4427-4750-AB15-83FFC3350FDC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 21, 1040);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('7F0C801D-A8A1-4564-B433-730C3B74B281', '20A8EFFC-7B12-4055-867A-598BE8E13AC3', '49F8916B-4427-4750-AB15-83FFC3350FDC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 26, 999);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('473C9DC8-C18B-4D03-A597-051AE594DC83', 'AEF43F68-9560-45B4-A896-F05A57D3D94E', '49F8916B-4427-4750-AB15-83FFC3350FDC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 20, 789);

--usa 2020 jan
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('1A286D1C-B601-4D7A-870E-6AC658D6AC85', '6C049725-98C8-41E4-BD06-E2D8DF0D1C51', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 20, 3056);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('E80A93DE-85B9-4378-94D9-FD6D5003DAF7', '853D15A9-1513-4091-AD7C-71A9A0E4EE6D', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 21, 3436);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('8376709E-D23B-471D-BD0A-D2A2E6BCF39C', '20A8EFFC-7B12-4055-867A-598BE8E13AC3', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 22, 2987);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('9A551FBE-4EAA-489D-BA0F-DBE945CC1B40', 'AEF43F68-9560-45B4-A896-F05A57D3D94E', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 25, 2706);

--usa 2019 jan
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('61A48E4C-9E65-4C9A-A42C-8E23952D913A', '0ECC5D6F-283D-416D-83DB-EDF0724698CB', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 20, 3056);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('FB06EB4F-C21F-44F3-AC4C-355B2C2037EB', 'AE9C46B3-C4F0-48D2-89F7-7EA727080305', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 21, 3436);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('0ED891B3-8FB2-41C0-8E7B-DBD8DB4FC30F', 'B3AA6D55-2E7C-4AB6-B958-A8470856075A', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 22, 2987);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('61E13706-53D0-4D8C-A017-E4119B838C84', '39371692-8486-4D88-ABE9-F321B19B264C', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 25, 2706);

--usa 2019 feb
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('F2B70D84-D8F0-49BF-82DD-70BEC0623B3E', '20FBEBD7-E494-4983-819E-411EA7C96C9D', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 20, 3056);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('455AA923-7834-4FEE-B238-A7AFCC524920', '3C251D2E-9170-4D07-B91E-027078C0B483', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 21, 3436);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('4695A7F6-0B0C-49C9-8C9A-B26CC54F78DC', '92ADD3E2-938E-4027-A566-6B23C8492933', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 22, 2987);
INSERT INTO public.f_sales(id, time_id, region_id, product_id, units_price, units_sold) values('DFD7ED31-AF50-4EFF-8465-CF7C3A238058', 'A5033762-6785-427B-860C-F817EEBAE031', '7648EC51-92FB-4486-AC44-F187DB207AFC', 'DC8FA285-4D1D-44F7-A2C0-7E6BA15B9E71', 25, 2706);
