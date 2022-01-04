DELIMITER //
CREATE PROCEDURE show_league_clubs(league_name varchar(46))
BEGIN
	SELECT cname AS Clubs FROM club WHERE
    fk_league_name = league_name;
END //
DELIMITER ;