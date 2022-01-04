DELIMITER //
CREATE PROCEDURE show_club_players(club_name varchar(46))
BEGIN
    SELECT DISTINCT(concat(first_name, last_name)) as name, player_id
    FROM person pe JOIN player pl
    on pe.ID = pl.fk_ID
    WHERE fk_cname = club_name;
END //
DELIMITER ;

-- DELIMITER //
-- CREATE PROCEDURE show_team_players(team_name varchar(46))
-- BEGIN
--     SELECT DISTINCT(concat(first_name, last_name)), 
--     (case 
--     WHEN (player_id = forward.fk_player_id)
--     THEN "Forward"
--     WHEN (player_id = defender.fk_player_id)
--     THEN "Defender"
--     WHEN (player_id = midfielder.fk_player_id)
--     THEN "Midfielder"
--     WHEN (player_id = goalkeeper.fk_player_id)
--     THEN "Goalkeeper"
--     END)
--     as position,player_id
--     FROM person JOIN player JOIN forward JOIN
--     defender JOIN midfielder JOIN goalkeeper
--     WHERE fk_team_name = team_name;
-- END //
-- DELIMITER ;