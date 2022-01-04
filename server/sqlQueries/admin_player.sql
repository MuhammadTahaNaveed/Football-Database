SELECT * from player;
SELECT ID as fk_ID FROM person WHERE ID NOT IN (SELECT fk_ID FROM player)