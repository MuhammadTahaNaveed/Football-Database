DELIMITER //
CREATE PROCEDURE show_player_info(in_player_id INT, in_name varchar(80))
BEGIN
    SELECT in_name AS name, matches, height, weight, POTMs, Goals, Passes, Assists, 
    red_cards, yellow_cards, fouls, strong_foot 
    
    FROM player WHERE player_id = in_player_id; 
END //
DELIMITER ;