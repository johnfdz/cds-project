DELIMITER //
DROP PROCEDURE IF EXISTS contenido_curso //
CREATE PROCEDURE contenido_curso
(
	IN id_curso int
)
BEGIN
	SELECT id_contenido, titulo, descripcion FROM contenido_curso
    WHERE curso_id = id_curso;
END //
DROP PROCEDURE IF EXISTS actividades_curso //
CREATE PROCEDURE actividades_curso(
	IN id_curso int 
)
BEGIN
	SELECT id_actividad, titulo, descripcion FROM actividades_curso
    WHERE curso_id = id_curso;
END //
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS post_contenido$$
CREATE PROCEDURE post_contenido(
	IN titulo varchar(200),
    IN descripcion varchar(500),
    IN id_curso INT
)
BEGIN
	INSERT INTO contenido_curso(titulo, descripcion, curso_id)
    VALUES(titulo, descripcion, id_curso);
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS get_curso_data $$
CREATE PROCEDURE get_curso_data(
    IN id INT,
    IN type VARCHAR(200)
)
BEGIN
    DECLARE query_text VARCHAR(1000);

    SET @query_text = 
    CASE 
        WHEN type = "estudiante" THEN
            'SELECT c.materia_id, m.nombre as materia, m.descripcion, 
             m.modulo_id as modulo, CONCAT(d.nombre," ",d.apellido) as docente 
             FROM curso c
             INNER JOIN estudiante e ON c.estudiante_id = e.id 
             INNER JOIN materia m ON c.materia_id = m.id_materias
             INNER JOIN docente d ON c.docente_id = d.id
             WHERE e.id = ?'
        
        WHEN type = "docente" THEN
            'SELECT c.materia_id, m.nombre as materia, m.descripcion, 
             m.modulo_id as modulo, CONCAT(d.nombre," ",d.apellido) as docente 
             FROM curso c
             INNER JOIN estudiante e ON c.estudiante_id = e.id 
             INNER JOIN materia m ON c.materia_id = m.id_materias
             INNER JOIN docente d ON c.docente_id = d.id
             INNER JOIN users u ON d.user_id = u.id
             WHERE u.id = ?'
        
        ELSE
            'SELECT NULL'
    END;
    PREPARE final_query FROM @query_text;
    EXECUTE final_query USING id;
    DEALLOCATE PREPARE final_query;
    
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS post_docente$$
CREATE PROCEDURE post_docente(
	IN cedula varchar(10),
    IN nombre varchar(150),
    IN apellido varchar(150),
    IN edad int,
    IN direccion varchar(500),
    IN correo varchar(150),
    IN telefono varchar(10),
    IN contrato_id int,
    IN user_id int
)
BEGIN

    DECLARE last_inserted_id INT;

    INSERT INTO users(username, password, name, email, role)
    VALUES(cedula, cedula, CONCAT(nombre," ",apellido), correo, "docente");

    SET last_inserted_id = LAST_INSERT_ID();

	INSERT INTO docente(cedula, nombre, apellido, edad, direccion, correo, telefono, contrato_id, user_id)
    VALUES(cedula, nombre, apellido, edad, direccion, correo, telefono, contrato_id, last_inserted_id);
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS post_estudiante$$
CREATE PROCEDURE post_estudiante(
	IN cedula varchar(10),
    IN nombre varchar(150),
    IN apellido varchar(150),
    IN edad int,
    IN direccion varchar(500),
    IN correo varchar(150),
    IN telefono varchar(10),
    IN nivel_educativo varchar(150),
    IN user_id int
)
BEGIN

    DECLARE last_inserted_id INT;

    INSERT INTO users(username, password, name, email, role)
    VALUES(cedula, cedula, CONCAT(nombre," ",apellido), correo, "estudiante");

    SET last_inserted_id = LAST_INSERT_ID();

	INSERT INTO estudiante(cedula, nombre, apellido, edad, direccion, correo, telefono, nivel_educacion, user_id)
    VALUES(cedula, nombre, apellido, edad, direccion, correo, telefono, nivel_educativo, last_inserted_id);
END $$
DELIMITER ;