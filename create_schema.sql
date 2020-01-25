CREATE TABLE public."d_products" (
				"id" uuid primary key,
				"name" text NOT NULL);	
			
CREATE TABLE public."d_times" (
				"id" uuid primary key,
				"day" int NOT null,
			    "day_desc" varchar(50) NOT null,
			    "month" int NOT null,
			    "month_desc" varchar(50) NOT null,
			    "quarter" int NOT null,
			    "year" int NOT null
				);
			
CREATE TABLE public."d_regions" (
				"id" uuid primary key,
				"country" varchar(50) NOT null,
			    "city" varchar(50) NOT null
				);
			
			
	
CREATE TABLE public."f_sales" (
				"id" uuid primary key,
				"units_sold" decimal NOT null,
				"units_price" decimal NOT null,
				"time_id" uuid not null,
				"region_id" uuid not null,
				"product_id" uuid not null,
				
			    constraint f_sales_d_time_fk foreign key ("time_id") references "d_times"("id"),
			    constraint f_sales_d_region_fk foreign key ("region_id") references "d_regions"("id"),
			    constraint f_sales_d_product_fk foreign key ("product_id") references "d_products"("id")
				
				);