create or replace function get_note (nid integer)
  returns table (note_id integer, title varchar, body text, updated_at timestamp, tag_ids integer[], tag_names varchar[], photos varchar[]) AS $$
  declare
  begin
    return query
      select n.id as note_id, n.title, n.body, n.updated_at, array_agg(t.id) as tag_ids, array_agg(t.name) as tag_names, p.photos
      from notes n
      inner join notes_tags nt on nt.note_id = n.id
      inner join tags t on t.id = nt.tag_id
      inner join (
        select distinct ph.note_id, array_agg(ph.url) as photos
        from photos ph
        group by ph.note_id
      ) p on p.note_id = n.id
      where n.id = nid
      group by n.id, p.photos;

  end;
  $$ language plpgsql;
