-- user
INSERT INTO users (username, email, status_user, password)
VALUES 
('utilisateur1', 'utilisateur1@example.com', 'actif', 'password1'),
('utilisateur2', 'utilisateur2@example.com', 'inactif', 'password2'),
('utilisateur3', 'utilisateur3@example.com', 'suspendu', 'password3'),
('utilisateur4', 'utilisateur4@example.com', 'actif', 'password4'),
('utilisateur5', 'utilisateur5@example.com', 'inactif', 'password5'),
('utilisateur6', 'utilisateur6@example.com', 'suspendu', 'password6'),
('utilisateur7', 'utilisateur7@example.com', 'actif', 'password7'),
('utilisateur8', 'utilisateur8@example.com', 'inactif', 'password8'),
('utilisateur9', 'utilisateur9@example.com', 'suspendu', 'password9'),
('utilisateur10', 'utilisateur10@example.com', 'actif', 'password10');

--message
INSERT INTO messages (messages, id_user, sending_date, date_created, type_message)
VALUES 
('Bonjour tout le monde!', 1, NOW(), NOW(),'send'),
('Ceci est un test.', 2, NOW(), NOW(),'send'),
('Message pour l''utilisateur 3.', 3, NOW(), NOW(),'send'),
('Encore un message.', 4, NOW(), NOW(),'send'),
('Dernier message ici.', 5, NOW(), NOW(),'send'),
('Un autre message pour l''utilisateur 6.', 6, NOW(), NOW(),'send'),
('Message pour l''utilisateur 7.', 7, NOW(), NOW(),'send'),
('Encore un message pour l''utilisateur 8.', 8, NOW(), NOW(),'send'),
('Message pour l''utilisateur 9.', 9, NOW(), NOW(),'send'),
('Dernier message pour l''utilisateur 10.', 10, NOW(), NOW(),'send'),
('Message supplémentaire pour l''utilisateur 1.', 1, NOW(), NOW(),'send'),
('Encore un message pour l''utilisateur 2.', 2, NOW(), NOW(),'received'),
('Message pour l''utilisateur 3.', 3, NOW(), NOW(),'received'),
('Encore un message pour l''utilisateur 4.', 4, NOW(), NOW(),'received'),
('Message pour l''utilisateur 5.', 5, NOW(), NOW(),'received'),
('Encore un message pour l''utilisateur 6.', 6, NOW(), NOW(),'received'),
('Message pour l''utilisateur 7.', 7, NOW(), NOW(),'received'),
('Encore un message pour l''utilisateur 8.', 8, NOW(), NOW(),'received'),
('Message pour l''utilisateur 9.', 9, NOW(), NOW(),'received'),
('Encore un message pour l''utilisateur 10.', 10, NOW(), NOW(),'received');
