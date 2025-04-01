<template>
  <el-row :gutter="30">
    <el-col>
      <div class="flex flex-col gap-8">
        <!-- Información Básica -->
        <el-card>
          <template #header>
            <div class="card-header">
              <span class="font-bold text-[var(--secondary-color)]">
                <el-icon>
                  <Calendar />
                </el-icon>
                {{ t("basicInformation") }}
              </span>
            </div>
          </template>

          <el-form :model="basicInformationForm" ref="formRef" label-width="120px" size="default" label-position="top">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="t('firstName')" prop="firstName">
                  <el-input v-model="basicInformationForm.firstName" :placeholder="t('enterFirstName')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="t('middleName')" prop="middleName">
                  <el-input v-model="basicInformationForm.middleName" :placeholder="t('enterMiddleName')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="t('lastName')" prop="lastName">
                  <el-input v-model="basicInformationForm.lastName" :placeholder="t('enterLastName')" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="t('birthDate')" prop="birthDate">
                  <el-date-picker v-model="basicInformationForm.birthDate" type="date" :placeholder="t('pickDate')" />
                </el-form-item>
                <span v-if="basicInformationForm.age" style="margin-left: 120px">
                  {{ t("age") }} {{ basicInformationForm.age }}
                </span>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <!-- Información de Residencia -->
        <el-card>
          <template #header>
            <div class="card-header">
              <span class="font-bold text-[var(--secondary-color)]">
                <el-icon>
                  <Calendar />
                </el-icon>
                {{ t("residenceInformation") }}
              </span>
            </div>
          </template>

          <el-form :model="addressInformationForm" ref="formRef" label-width="120px" size="default" label-position="top">
            <el-row>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="t('address')" prop="address">
                  <el-input v-model="addressInformationForm.address" :placeholder="t('enterAddress')" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="30">
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="t('city')" prop="city">
                  <el-input v-model="addressInformationForm.city" :placeholder="t('enterCity')" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="t('state')" prop="state">
                  <el-input v-model="addressInformationForm.state" :placeholder="t('enterState')" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="t('country')" prop="country">
                  <el-input v-model="addressInformationForm.country" :placeholder="t('enterCountry')" disabled />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <!-- Información de Contacto -->
        <el-card>
          <template #header>
            <div class="card-header">
              <span class="font-bold text-[var(--secondary-color)]">
                <el-icon>
                  <Calendar />
                </el-icon>
                {{ t("contactInformation") }}
              </span>
            </div>
          </template>

          <el-form :model="contactInformationForm" ref="formRef" label-width="120px" size="default" label-position="top">
            <el-row>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="t('phone')" prop="phone">
                  <el-input v-model="contactInformationForm.phone" :placeholder="t('enterCellphone')" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="t('email')" prop="email">
                  <el-input v-model="contactInformationForm.email" :placeholder="t('enterEmail')" disabled />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>

  <el-button class="floating" type="primary" @click="submitForm">
    {{ t("update") }}
  </el-button>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import { useUserProfileStore } from "../stores/UserProfile.store";
import { useUserStore } from "../stores/user.store";
import type { UserProfile } from "@/domain/Interfaces/user/UserProfile.interface";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
  firstName: "",
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
      userFirstName: basicInformationForm.firstName ?? "",
      userMiddleName: basicInformationForm.middleName ?? "",
      surName: basicInformationForm.lastName ?? "",
      birthday: basicInformationForm.birthDate? basicInformationForm.birthDate.toISOString().split("T")[0]: "", 
      address: addressInformationForm.address ?? "",
      cellPhone: contactInformationForm.phone ?? "",
      userEmail: contactInformationForm.email ?? "",
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
  await userProfileStore.fetchUserProfile(userId.toString());
  const UserProfile = userProfileStore.userProfile;

  if (!UserProfile) return;

  basicInformationForm.firstName = UserProfile.userFirstName ?? "";
  basicInformationForm.middleName = UserProfile.userMiddleName ?? "";
  basicInformationForm.lastName = UserProfile.surName ?? "";
  basicInformationForm.birthDate = UserProfile.birthday
    ? new Date(UserProfile.birthday)
    : new Date();
  addressInformationForm.address = UserProfile.address ?? "";
  contactInformationForm.email = UserProfile.userEmail ?? "";
  contactInformationForm.phone = UserProfile.cellPhone ?? "";
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
