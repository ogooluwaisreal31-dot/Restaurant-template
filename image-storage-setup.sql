-- Creates a public image bucket for restaurant photos.
-- Images are public to display on the website; only the signed-in owner can upload/delete files in their own folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('restaurant-images', 'restaurant-images', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = true, file_size_limit = 10485760,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif'];

drop policy if exists "Public can view restaurant images" on storage.objects;
drop policy if exists "Owners upload their restaurant images" on storage.objects;
drop policy if exists "Owners update their restaurant images" on storage.objects;
drop policy if exists "Owners delete their restaurant images" on storage.objects;

create policy "Public can view restaurant images"
on storage.objects for select
using (bucket_id = 'restaurant-images');

create policy "Owners upload their restaurant images"
on storage.objects for insert to authenticated
with check (bucket_id = 'restaurant-images' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Owners update their restaurant images"
on storage.objects for update to authenticated
using (bucket_id = 'restaurant-images' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'restaurant-images' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Owners delete their restaurant images"
on storage.objects for delete to authenticated
using (bucket_id = 'restaurant-images' and (storage.foldername(name))[1] = auth.uid()::text);
