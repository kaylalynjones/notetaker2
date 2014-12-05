CREATE or REPLACE FUNCTION display_note (userId integer, note_limit integer)
--RETURNS TABLE(created_on timestamp, title varchar, body text, name varchar) AS $$
RETURNS json AS $$
BEGIN

  RETURN array_to_json(array_agg(row_to_json(t)))
  from (  
    select n.created_at, n.title, n.body, t.name as tags
    from notes_tags nt
    inner join notes n on n.id = nt.note_id
    inner join tags t on t.id = nt.tag_id
    where n.user_id = userId
    order by n.created_at DESC
    limit note_limit
    ) t;
    
END;

$$ LANGUAGE plpgsql;

SELECT * FROM users;
SELECT * from display_note(1, 10);
