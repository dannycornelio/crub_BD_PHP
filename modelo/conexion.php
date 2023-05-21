<?php

abstract class Conexion{
    public static $conexion = null;

    private static function Conectar(){
        try{
            //CONEXION A LA BD DE INFORMIX EN DOCKER 
            self::$conexion = new PDO('informix:host=host.docker.internal; service=9088; database=mdn_cornelio; server=informix; protocol=onsoctcp;EnableScrollableCursors = 1','informix','in4mix'); 
            // echo "CONECTADO";
        }catch(PDOException $e){
            // IMPRIME EN PANTALLA EL ERROR
            echo "Error de conexion de BD";
            echo "<br>";
            echo $e->getMessage();
            exit;
        }

        return self::$conexion;
    }

    public static function Ejecutar($sql){
        // CONECTANDOSE A LA BD CON EL METODO CONECTAR
        self::Conectar();
        // PREPARAMOS LA SENTENCIA
        $sentencia = self::$conexion->prepare($sql);
        // EJECUTAMOS A SENTENCIA
        $resultado = $sentencia->execute();
        // CERRANDO LA CONEXION
        self::$conexion = null;
        // DEVOLVEMOS RESULTADOS
        return $resultado;
    }

    public static function Servir($sql){
        // CONECTANDOSE A LA BD CON EL METODO CONECTAR
        self::Conectar();
        // PREPARAMOS LA SENTENCIA
        $sentencia = self::$conexion->prepare($sql);
        // EJECUTAMOS A SENTENCIA
        $sentencia->execute();
        $resultados = $sentencia->fetchAll(PDO::FETCH_ASSOC);

        // CERRANDO LA CONEXION
        self::$conexion = null;
        // DEVOLVEMOS RESULTADOS
        return $resultados;
    }
}
?>