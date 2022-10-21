/*  Triggers  compras_insumos*/ 


CREATE TRIGGER IF NOT EXISTS compras_insumos_AFTER_INSERT AFTER INSERT ON compras_insumos
BEGIN
	UPDATE insumos 
		SET stock = (stock + new.cantidad) 
	WHERE id = new.id_insumo;
END;


CREATE TRIGGER IF NOT EXISTS compras_insumos_AFTER_UPDATE_cantidad AFTER UPDATE OF cantidad ON compras_insumos
BEGIN
	UPDATE insumos 
		SET stock = (stock - old.cantidad + new.cantidad) 
	WHERE id = old.id_insumo;
END;


CREATE TRIGGER IF NOT EXISTS compras_insumos_AFTER_UPDATE_idInsumo AFTER UPDATE OF id_insumo ON compras_insumos
BEGIN
	UPDATE insumos 
		SET stock = (stock + old.cantidad) 
		WHERE id = new.id_insumo;
	UPDATE insumos 
		SET stock = (stock - old.cantidad) 
		WHERE id = old.id_insumo;	
END;


CREATE TRIGGER IF NOT EXISTS compras_insumos_AFTER_DELETE AFTER DELETE ON compras_insumos
BEGIN
	UPDATE insumos 
		SET stock = (stock - old.cantidad) 
	WHERE id = old.id_insumo;
END;



/*  Triggers  muebles_x_insumos*/ 

CREATE TRIGGER IF NOT EXISTS insumos_x_mueble_AFTER_INSERT AFTER INSERT ON insumos_x_mueble
BEGIN
	UPDATE insumos 
		SET stock = (stock - new.cantidad) 
	WHERE id = new.id_insumo;
END;


CREATE TRIGGER IF NOT EXISTS insumos_x_mueble_AFTER_UPDATE_cantidad AFTER UPDATE OF cantidad ON insumos_x_mueble
BEGIN
	UPDATE insumos 
		SET stock = (stock + old.cantidad - new.cantidad) 
	WHERE id = old.id_insumo;
END;


CREATE TRIGGER IF NOT EXISTS insumos_x_mueble_AFTER_UPDATE_idInsumo AFTER UPDATE OF id_insumo ON insumos_x_mueble
BEGIN
	UPDATE insumos 
		SET stock = (stock - old.cantidad) 
		WHERE id = new.id_insumo;
	UPDATE insumos 
		SET stock = (stock + old.cantidad) 
		WHERE id = old.id_insumo;
END;


CREATE TRIGGER IF NOT EXISTS insumos_x_mueble_AFTER_DELETE AFTER DELETE ON insumos_x_mueble
BEGIN
	UPDATE insumos 
		SET stock = (stock + old.cantidad) 
	WHERE id = old.id_insumo;
END;


