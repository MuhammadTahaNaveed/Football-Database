DELIMITER //
CREATE PROCEDURE insert_into_player(in_height float, in_weight float, in_POTMS INT, in_passes INT, in_assists INT,
in_goals INT, in_red_cards INT, in_yellow_cards INT, in_matches INT, in_fouls INT, in_strong_foot char(1), in_fk_ID INT,
in_fk_team_name varchar(45), in_fk_cname varchar(45)
)
BEGIN
INSERT INTO player(height, weight, POTMs, Passes, Assists, Goals, red_cards, yellow_cards, matches, 
fouls, strong_foot, fk_ID, fk_team_name, fk_cname
)
VALUES (in_height , in_weight , in_POTMS , in_passes , in_assists ,
in_goals , in_red_cards , in_yellow_cards , in_matches , in_fouls , in_strong_foot , in_fk_ID ,
in_fk_team_name , in_fk_cname );
END //
DELIMITER ;