<?php
require '../../modelos/Cliente.php';
    try {
        $cliente = new Cliente();

        $clientes = $cliente->buscar();
            // var_dump($clientes);
            // exit;
    } catch (PDOException $e) {
        $error = $e->getMessage();
    } catch (Exception $e2){
        $error = $e2->getMessage();
    }
?>
<?php include_once '../../includes/header.php'?>
<?php include_once '../../includes/navbar.php'?>
    <div class="container">
        <h1 class="text-center">Formulario de ingreso de ventas</h1>
        <div class="row justify-content-center">
            <form action="/crud_BD_PHP/controladores/ventas/guardar.php" method="POST" class="col-lg-8 border bg-light p-3">
                <div class="row mb-3">
                    <div class="col">
                        <label for="ventas_cliente">Cliente</label>
                        <select name="ventas_cliente" id="ventas_cliente" class="form-control">
                            <option value="">SELECCIONE...</option>
                            <?php foreach ($clientes as $key => $cliente) : ?>
                                <option value="<?= $cliente['CLIENTE_ID'] ?>"><?= $cliente['CLIENTE_NOMBRE'] ?></option>
                            <?php endforeach?>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <button type="submit" class="btn btn-primary w-100">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
<?php include_once '../../includes/footer.php'?>