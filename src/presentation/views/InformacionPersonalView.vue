<template>
  <el-row :gutter="30">
    <el-col>
      <div class="flex flex-col gap-8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span class="font-bold text-[var(--secondary-color)]">
                <el-icon>
                  <Calendar />
                </el-icon>
                Información básica
              </span>
            </div>
          </template>

          <el-form :model="basicInformationForm" ref="formRef" label-width="120px" size="default" label-position="top">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="Primer nombre" prop="firstName">
                  <el-input v-model="basicInformationForm.firstName" placeholder="Enter first name" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="Segundo nombre" prop="middleName">
                  <el-input v-model="basicInformationForm.middleName" placeholder="Enter middle name" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="Primer apellido" prop="lastName">
                  <el-input v-model="basicInformationForm.lastName" placeholder="Enter last name" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="Fecha de nacimiento" prop="birthDate">
                  <el-date-picker v-model="basicInformationForm.birthDate" type="date" placeholder="Pick a date" />
                </el-form-item>
                <span v-if="basicInformationForm.age" style="margin-left: 120px">Edad: {{ basicInformationForm.age }}</span>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <el-card>
          <template #header>
            <div class="card-header">
              <span class="font-bold text-[var(--secondary-color)]">
                <el-icon>
                  <Calendar />
                </el-icon>
                Información de Residencia
              </span>
            </div>
          </template>

          <el-form :model="addressInformationForm" ref="formRef" label-width="120px" size="default" label-position="top">
            <el-row>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="Dirección" prop="address">
                  <el-input v-model="addressInformationForm.address" placeholder="Enter an address" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="30">
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="Ciudad" prop="city">
                  <el-input v-model="addressInformationForm.city" placeholder="Enter a city" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="Departamento/Estado" prop="state">
                  <el-input v-model="addressInformationForm.state" placeholder="Enter a state" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="País" prop="country">
                  <el-input v-model="addressInformationForm.country" placeholder="Enter a country" disabled />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <el-card>
          <template #header>
            <div class="card-header">
              <span class="font-bold text-[var(--secondary-color)]">
                <el-icon>
                  <Calendar />
                </el-icon>
                Información de Contacto
              </span>
            </div>
          </template>

          <el-form :model="contactInformationForm" ref="formRef" label-width="120px" size="default" label-position="top">
            <el-row>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="Celular" prop="phone">
                  <el-input v-model="contactInformationForm.phone" placeholder="Enter a cellphone" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="Correo electrónico" prop="email">
                  <el-input v-model="contactInformationForm.email" placeholder="Enter an email" disabled />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>

  <el-button class="floating" type="primary" @click="submitForm">Actualizar</el-button>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import { useUserProfileStore } from "../stores/UserProfile.store";
import { useUserStore } from "../stores/user.store";
import type { UserProfile } from "@/domain/Interfaces/user/UserProfile.interface";

// Interfaz para el formulario
interface BasicInformationForm {
  firstName: string | null | undefined;
  middleName: string | null | undefined;
  lastName: string | null | undefined;
  birthDate: Date | null;
  age: number | null;
  maritalStatus: string;
}

// Datos del formulario
const basicInformationForm = reactive<BasicInformationForm>({
  firstName:  "",
  middleName: "",
  lastName: "",
  birthDate: new Date(2002, 5, 29),
  age: null,
  maritalStatus: "Single",
});

interface AddressInformationForm {
  address: string | null | undefined;
  city: string;
  state: string;
  country: string;
}

const addressInformationForm = reactive<AddressInformationForm>({
  address: "",
  city: "Ibague",
  state: "Tolima",
  country: "Colombia",
});

interface ContactInformationForm {
  phone: string | null | undefined;
  email: string | null | undefined;
}

const contactInformationForm = reactive<ContactInformationForm>({
  phone: "",
  email: "",
});

// Referencia al formulario
const formRef = ref<FormInstance | null>(null);
const userStore = useUserStore();

const updateUserProfile = async (userid: number) => {
  try {
    const userProfileStore = useUserProfileStore();
    const userProfile: UserProfile = {
      userId: userid,
      userFirstName: basicInformationForm.firstName,
      userMiddleName: basicInformationForm.middleName,
      surName: basicInformationForm.lastName,
      birthday: basicInformationForm.birthDate?.toISOString(),
      address: addressInformationForm.address,
      cellPhone: contactInformationForm.phone,
      userEmail: contactInformationForm.email,
    };
    await userProfileStore.updateUserProfile(userProfile);
    console.log("User profile updated successfully");
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

const submitForm = async () => {
  if (!formRef.value) return;

  formRef.value.validate(async (valid) => {
    if (valid) {
      const userId = Number(userStore.getUserId);
      if (!userId || userId <= 0) {
        console.error("Invalid UserId:", userId);
        return;
      }
      await updateUserProfile(userId);
    } else {
      console.error("Validation failed");
    }
  });
};



const loadData = async () => {
  const userId = Number(userStore.getUserId);
  if (!userId || userId <= 0) {
    console.error("Invalid UserId:", userId);
    return;
  }

const userProfileStore = useUserProfileStore();
await userProfileStore.fetchUserProfile(userId);
const UserProfile = userProfileStore.userProfile;

  
  if (!UserProfile) return;

  basicInformationForm.firstName = UserProfile.userFirstName;
  basicInformationForm.middleName = UserProfile.userMiddleName;
  basicInformationForm.lastName = UserProfile.surName;
  basicInformationForm.birthDate = UserProfile.birthday ? new Date(UserProfile.birthday) : new Date();
  addressInformationForm.address = UserProfile.address || "";
  contactInformationForm.email = UserProfile.userEmail;
  contactInformationForm.phone = UserProfile.cellPhone;

};
onMounted(() => {
    loadData()
});
</script>
<style>
.floating {
  position: fixed;
  bottom: 80px;
  right: 80px;
  z-index: 100;
}
</style>
