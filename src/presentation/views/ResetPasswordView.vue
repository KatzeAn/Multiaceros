<template>
    <div class="p-4 max-w-sm mx-auto">
      <el-form :model="form" ref="formRef" status-icon>
        <el-form-item label="Nueva contraseña" :rules="passwordRules" prop="newPassword">
          <el-input 
            v-model="form.newPassword" 
            type="password" 
            placeholder="Ingresa tu nueva contraseña"
            class="w-full"
          />
        </el-form-item>
  
        <el-form-item label="Confirmar nueva contraseña" :rules="confirmPasswordRules" prop="confirmPassword">
          <el-input 
            v-model="form.confirmPassword" 
            type="password" 
            placeholder="Confirma tu nueva contraseña"
            class="w-full"
          />
        </el-form-item>
  
        <el-button type="primary" @click="handleSubmit">Restablecer contraseña</el-button>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          newPassword: '',
          confirmPassword: ''
        },
        passwordRules: [
          { required: true, message: 'Por favor ingresa una nueva contraseña', trigger: 'blur' },
          { min: 6, message: 'La contraseña debe tener al menos 6 caracteres', trigger: 'blur' }
        ],
        confirmPasswordRules: [
          { required: true, message: 'Por favor confirma tu nueva contraseña', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' }
        ]
      };
    },
    methods: {
      validateConfirmPassword(rule, value, callback) {
        if (value !== this.form.newPassword) {
          callback(new Error('Las contraseñas no coinciden'));
        } else {
          callback();
        }
      },
      handleSubmit() {
        this.$refs.formRef.validate(valid => {
          if (valid) {
            alert('Contraseña restablecida correctamente');
          } else {
            console.log('Error en la validación');
            return false;
          }
        });
      }
    }
  };
  </script>
  
  