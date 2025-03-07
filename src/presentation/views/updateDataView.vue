<template>
    <el-card shadow="hover" class="form-container">
      <el-tabs v-model="activeTab" type="border-card">
        
        <!-- Tab de actualización de datos -->
        <el-tab-pane label="Actualizar Datos" name="datos">
          <el-form :model="formData" label-width="200px">
            
            <el-form-item label="Nuevo Correo Electrónico">
              <el-input v-model="formData.nuevoCorreo" type="email" placeholder="Ingrese su nuevo correo">
                <template #prefix>
                  <el-icon><Message /></el-icon>
                </template>
              </el-input>
            </el-form-item>
  
            <el-form-item label="Títulos o certificaciones">
              <el-input v-model="formData.titulos" placeholder="Ingrese sus títulos obtenidos">
                <template #prefix>
                  <el-icon><CollectionTag /></el-icon>
                </template>
              </el-input>
            </el-form-item>
  
            <el-form-item label="Último nivel de estudios">
              <el-input v-model="formData.nivelEstudios" placeholder="Ingrese su nivel de estudios">
                <template #prefix>
                  <el-icon><School /></el-icon>
                </template>
              </el-input>
            </el-form-item>
  
            <el-form-item label="Institución educativa">
              <el-input v-model="formData.institucion" placeholder="Ingrese su institución educativa">
                <template #prefix>
                  <el-icon><OfficeBuilding /></el-icon>
                </template>
              </el-input>
            </el-form-item>
  
            <el-form-item label="Nacionalidad">
              <el-input v-model="formData.nacionalidad" placeholder="Ingrese su nacionalidad">
                <template #prefix>
                  <el-icon><Flag /></el-icon>
                </template>
              </el-input>
            </el-form-item>
  
            <el-form-item label="Motivo de la Solicitud">
              <el-input v-model="formData.motivo" type="textarea" placeholder="Explique por qué desea actualizar esta información">
                <template #prefix>
                  <el-icon><Edit /></el-icon>
                </template>
              </el-input>
            </el-form-item>
  
            <el-form-item>
              <el-button type="primary" @click="enviarSolicitud" round>
                Enviar Solicitud
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
  
        <!-- Tab de cambio de contraseña -->
        <el-tab-pane label="Cambiar Contraseña" name="password">
          <el-form :model="passwordData" label-width="200px">
            
            <el-form-item label="Nueva Contraseña">
              <el-input v-model="passwordData.nuevaContrasena" type="password" show-password placeholder="Ingrese la nueva contraseña">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
  
            <el-form-item label="Confirmar Contraseña">
              <el-input v-model="passwordData.confirmarContrasena" type="password" show-password placeholder="Confirme la nueva contraseña">
                <template #prefix>
                  <el-icon><Key /></el-icon>
                </template>
              </el-input>
            </el-form-item>
  
            <el-form-item>
              <el-button type="primary" @click="enviarSolicitudPassword" round>
                Enviar Solicitud
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
  
      </el-tabs>
    </el-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: "datos",
        formData: {
          nuevoCorreo: "",
          titulos: "",
          nivelEstudios: "",
          institucion: "",
          nacionalidad: "",
          motivo: "",
        },
        passwordData: {
          nuevaContrasena: "",
          confirmarContrasena: "",
        },
      };
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 10px;
  }
  </style>
  