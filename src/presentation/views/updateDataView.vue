<template>
  <el-card shadow="hover" class="form-container">
    <el-tabs v-model="activeTab" type="border-card">
      
      <!-- Tab de actualización de datos -->
      <el-tab-pane :label="t('updateData')" name="datos">
        <el-form :model="formData">
          <el-form-item :label="t('newEmail')">
            <el-input v-model="formData.nuevoCorreo" type="email" :placeholder="t('enterNewEmail')">
              <template #prefix>
                <el-icon><Message /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="t('titlesCertifications')">
            <el-input v-model="formData.titulos" :placeholder="t('enterTitles')">
              <template #prefix>
                <el-icon><CollectionTag /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="t('lastEducationLevel')">
            <el-input v-model="formData.nivelEstudios" :placeholder="t('enterEducationLevel')">
              <template #prefix>
                <el-icon><School /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="t('educationalInstitution')">
            <el-input v-model="formData.institucion" :placeholder="t('enterInstitution')">
              <template #prefix>
                <el-icon><OfficeBuilding /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="t('nationality')">
            <el-input v-model="formData.nacionalidad" :placeholder="t('enterNationality')">
              <template #prefix>
                <el-icon><Flag /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="t('requestReason')">
            <el-input v-model="formData.motivo" type="textarea" :placeholder="t('explainReason')">
              <template #prefix>
                <el-icon><Edit /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="enviarSolicitud" round>
              {{ t('sendRequest') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- Tab de cambio de contraseña -->
      <el-tab-pane :label="t('changePassword')" name="password">
        <el-form :model="passwordData">
          <el-form-item :label="t('newPassword')">
            <el-input v-model="passwordData.nuevaContrasena" type="password" show-password :placeholder="t('enterNewPassword')">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="t('confirmPassword')">
            <el-input v-model="passwordData.confirmarContrasena" type="password" show-password :placeholder="t('confirmNewPassword')">
              <template #prefix>
                <el-icon><Key /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="enviarSolicitudPassword" round>
              {{ t('sendRequest') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>
  </el-card>
</template>
  
<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n();
    return { t };
  },
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
  