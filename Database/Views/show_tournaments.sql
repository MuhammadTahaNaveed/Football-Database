CREATE VIEW show_tournaments AS
SELECT league_name AS tournaments FROM league
UNION ALL
SELECT 'World Cup';
