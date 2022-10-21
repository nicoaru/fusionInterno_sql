CREATE TRIGGER compras_insumos_AFTER_DELETE AFTER DELETE ON compras_insumos
BEGIN
	UPDATE insumos 
		SET stock = (stock - old.cantidad) 
	WHERE id = old.id_insumo;
END;

CREATE TRIGGER compras_insumos_AFTER_INSERT AFTER INSERT ON compras_insumos
BEGIN
	UPDATE insumos 
		SET stock = (stock + new.cantidad) 
	WHERE id = new.id_insumo;
END;

CREATE TRIGGER compras_insumos_AFTER_UPDATE_cantidad AFTER UPDATE OF cantidad ON compras_insumos
BEGIN
	UPDATE insumos 
		SET stock = (stock - old.cantidad + new.cantidad) 
	WHERE id = old.id_insumo;
END;

CREATE TRIGGER compras_insumos_AFTER_UPDATE_idInsumo AFTER UPDATE OF id_insumo ON compras_insumos
BEGIN
	UPDATE insumos 
		SET stock = (stock + old.cantidad) 
		WHERE id = new.id_insumo;
	UPDATE insumos 
		SET stock = (stock - old.cantidad) 
		WHERE id = old.id_insumo;	
END;


/**/

CREATE TRIGGER insumos_x_mueble_AFTER_DELETE AFTER DELETE ON insumos_x_mueble
BEGIN
	UPDATE insumos 
		SET stock = (stock + old.cantidad) 
	WHERE id = old.id_insumo;
END;

CREATE TRIGGER insumos_x_mueble_AFTER_INSERT AFTER INSERT ON insumos_x_mueble
BEGIN
	UPDATE insumos 
		SET stock = (stock - new.cantidad) 
	WHERE id = new.id_insumo;
END;

CREATE TRIGGER insumos_x_mueble_AFTER_UPDATE_cantidad AFTER UPDATE OF cantidad ON insumos_x_mueble
BEGIN
	UPDATE insumos 
		SET stock = (stock + old.cantidad - new.cantidad) 
	WHERE id = old.id_insumo;
END;

CREATE TRIGGER insumos_x_mueble_AFTER_UPDATE_idInsumo AFTER UPDATE OF id_insumo ON insumos_x_mueble
BEGIN
	UPDATE insumos 
		SET stock = (stock - old.cantidad) 
		WHERE id = new.id_insumo;
	UPDATE insumos 
		SET stock = (stock + old.cantidad) 
		WHERE id = old.id_insumo;
END;


/**/

/*DROP TRIGGER main.muebles_prod_AFTER_INSERT;
DROP TRIGGER main.muebles_prod_AFTER_UPDATE_idEstado;*/

CREATE TRIGGER muebles_prod_AFTER_INSERT AFTER INSERT ON muebles_prod
BEGIN
	INSERT INTO estados_x_mueble (id_mueble, id_estado, fecha) VALUES (new.id, new.id_estado, datetime());

END;

CREATE TRIGGER muebles_prod_AFTER_UPDATE_idEstado AFTER UPDATE OF id_estado ON muebles_prod
BEGIN
	INSERT INTO estados_x_mueble (id_mueble, id_estado, fecha) VALUES (old.id, new.id_estado, datetime());

END;


