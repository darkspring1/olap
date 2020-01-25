 select 
 dr.country,
 dr.city,
 SUM(f.units_sold) units_sold
 FROM
  public.f_sales f
  
 join public.d_times dt
 on f.time_id = dt.id
 
 join public.d_regions dr
 on f.region_id = dr.id
 
 join public.d_products dp
 on f.product_id = dp.id
 
 group by
 dr.country, dr.city