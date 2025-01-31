<template>
    <el-row :gutter="30">
        <el-col>
            <div class="flex flex-col gap-8">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="font-bold text-[var(--secondary-color)]"><el-icon>
                                    <Calendar />
                                </el-icon>
                                Información básica
                            </span>
                        </div>
                    </template>

                    <el-form :model="basicInformationForm" ref="formRef" label-width="120px" size="default"
                        label-position="top">
                        <el-row :gutter="30">
                            <el-col :span="6">
                                <!-- Nombre -->
                                <el-form-item label="Primer nombre" prop="firstName">
                                    <el-input v-model="basicInformationForm.firstName" placeholder="Enter first name"
                                        disabled />
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <!-- Segundo Nombre -->
                                <el-form-item label="Segundo nombre" prop="lastName">
                                    <el-input v-model="basicInformationForm.middleName" placeholder="Enter last name"
                                        disabled />
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <!-- Primer Apellido -->
                                <el-form-item label="Primer apellido" prop="lastName">
                                    <el-input v-model="basicInformationForm.lastName" placeholder="Enter last name"
                                        disabled />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="6">
                                <!-- Fecha de nacimiento -->
                                <el-form-item label="Fecha de nacimiento" prop="birthDate">
                                    <el-date-picker v-model="basicInformationForm.birthDate" type="date"
                                        placeholder="Pick a date" disabled />
                                </el-form-item>
                                <span v-if="basicInformationForm.age" style="margin-left: 120px;">Age: {{
                                    basicInformationForm.age }}</span>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="6">
                                <!-- Estado civil -->
                                <el-form-item label="Estado Civil" prop="maritalStatus">
                                    <el-select v-model="basicInformationForm.maritalStatus"
                                        placeholder="Select marital status">
                                        <el-option label="Soltero" value="Single" />
                                        <el-option label="Casado" value="Married" />
                                        <el-option label="Divorciado" value="Divorced" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <!-- Botones -->
                        <el-form-item>
                            <el-button type="primary" @click="submitForm" disabled>Actualizar</el-button>
                            <el-button @click="resetForm" disabled>Cancelar</el-button>
                        </el-form-item>
                    </el-form>

                </el-card>

                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="font-bold text-[var(--secondary-color)]"><el-icon>
                                    <Calendar />
                                </el-icon>
                                Información de Residencia
                            </span>
                        </div>
                    </template>

                    <el-form :model="addressInformationForm" ref="formRef" label-width="120px" size="default"
                        label-position="top">

                        <el-row>
                            <el-col :span="6">
                                <!-- Direccion -->
                                <el-form-item label="Direccion" prop="firstName">
                                    <el-input v-model="addressInformationForm.address" placeholder="Enter a adress" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="30">
                            <el-col :span="6">
                                <!-- Nombre -->
                                <el-form-item label="Ciudad" prop="firstName">
                                    <el-input v-model="addressInformationForm.city" placeholder="Enter a city" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <!-- Segundo Nombre -->
                                <el-form-item label="Departamento/Estado" prop="lastName">
                                    <el-input v-model="addressInformationForm.state" placeholder="Enter a state" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <!-- Primer Apellido -->
                                <el-form-item label="Pais" prop="lastName">
                                    <el-input v-model="addressInformationForm.country" placeholder="Enter a country" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <!-- Botones -->
                        <el-form-item>
                            <el-button type="primary" @click="submitForm" disabled>Actualizar</el-button>
                            <el-button @click="resetForm" disabled>Cancelar</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="font-bold text-[var(--secondary-color)]"><el-icon>
                                    <Calendar />
                                </el-icon>
                                Información de Contacto
                            </span>
                        </div>
                    </template>

                    <el-form :model="contactInformationForm" ref="formRef" label-width="120px" size="default"
                        label-position="top">

                        <el-row>
                            <el-col :span="6">
                                <!-- Direccion -->
                                <el-form-item label="Celular" prop="firstName">
                                    <el-input v-model="contactInformationForm.phone" placeholder="Enter a adress" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="6">
                                <!-- Direccion -->
                                <el-form-item label="Correo eléctronico" prop="firstName">
                                    <el-input v-model="contactInformationForm.email" placeholder="Enter a adress" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <!-- Botones -->
                        <el-form-item>
                            <el-button type="primary" @click="submitForm" disabled>Actualizar</el-button>
                            <el-button @click="resetForm" disabled>Cancelar</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="font-bold text-[var(--secondary-color)]"><el-icon>
                                    <Calendar />
                                </el-icon>
                                Información Educacional
                            </span>
                        </div>
                    </template>
                    <el-empty :image-size="200" />
                </el-card>
            </div>
        </el-col>
    </el-row>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useUserProfileStore } from '../stores/UserProfile.store';
import { useUserStore } from '../stores/user.store';
import type { UserProfile } from '@/domain/Interfaces/UserProfile.interface';

// Interfaz para el formulario
interface BasicInformationForm {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date | null;
  age: number | null;
  maritalStatus: string;
}

// Datos del formulario
const basicInformationForm = reactive<BasicInformationForm>({
  firstName: 'Harol',
  middleName: 'Stiven',
  lastName: 'Guzman',
  birthDate: new Date(2002, 5, 29),
  age: null,
  maritalStatus: 'Single',
});

interface AddressInformationForm {
    address: string;
    city: string;
    state: string;
    country: string;
}

const addressInformationForm = reactive<AddressInformationForm>({
    address: 'Mz 4 Cs 36 B/El Refugio',
    city: 'Ibague',
    state: 'Tolima',
    country: 'Colombia',
});

interface ContactInformationForm {
    phone: string;
    email: string;
}

const contactInformationForm = reactive<ContactInformationForm>({
    phone: '3133651018',
    email: 'harol.stiven147@gmail.com'
});


// Referencia al formulario
const formRef = ref<FormInstance | null>(null);

// Función para enviar el formulario
const submitForm = () => {
  if (formRef.value) {
    formRef.value.validate((valid) => {
      if (valid) {
        console.log('Form submitted:', basicInformationForm);
      } else {
        console.error('Validation failed');
      }
    });
  }
};

// Función para resetear el formulario
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
  const loading = ref<boolean>(false);
  const Userdata = ref<UserProfile | null>(null);
  const loadData = async () => {
    const userid = await useUserStore().getUserId;
  const { loading: isLoading, userProfile: UserProfile } = await useUserProfileStore().fetchUserProfile(userid);
  loading.value = isLoading;
  Userdata.value = UserProfile;
  console.log (Userdata.value)
};
 
  onMounted(() => {
    console.log ('Component mounted');
  loadData();
});

};


</script>

<style lang="scss" scoped>

</style>