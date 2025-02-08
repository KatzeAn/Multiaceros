<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="w-full"
    :size="formSize"
    label-position="top"
    status-icon
  >
    <!-- Datos personales -->
    <div class="flex items-center my-6">
      <div class="flex-grow border-t border-gray-300"></div>
      <span class="mx-4 font-bold">Datos personales</span>
      <div class="flex-grow border-t border-gray-300"></div>
    </div>

    <el-row :gutter="30">
      <el-col :span="8">
        <el-form-item
          label="Número de Documento"
          prop="userData.numberDocument"
        >
          <el-input type="number" v-model="ruleForm.userData.numberDocument" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Primer Nombre" prop="userData.userFirstName">
          <el-input v-model="ruleForm.userData.userFirstName" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Segundo Nombre" prop="userData.userMiddleName">
          <el-input v-model="ruleForm.userData.userMiddleName" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="8">
        <el-form-item label="Primer Apellido" prop="userData.surName">
          <el-input v-model="ruleForm.userData.surName" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Tipo de Sangre" prop="bloodTypeId">
          <el-select
            v-model="ruleForm.bloodTypeId"
            placeholder="Seleccione el tipo de sangre"
          >
            <el-option label="A+" :value="1" />
            <el-option label="O-" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Fecha de nacimiento" prop="userData.birthday">
          <el-date-picker
            v-model="ruleForm.userData.birthday"
            type="date"
            placeholder="Seleccione una fecha"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="8">
        <el-upload v-model:file-list="fileList">
          <el-button type="primary">Subir Foto del empleado</el-button>
        </el-upload>
      </el-col>
    </el-row>

    <!-- Información de contacto -->
    <div class="flex items-center my-6">
      <div class="flex-grow border-t border-gray-300"></div>
      <span class="mx-4 font-bold">Información de contacto</span>
      <div class="flex-grow border-t border-gray-300"></div>
    </div>

    <el-row :gutter="30">
      <el-col :span="8">
        <el-form-item label="Dirección de residencia" prop="userData.address">
          <el-input v-model="ruleForm.userData.address" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Celular" prop="userData.cellPhone">
          <el-input type="tel" v-model="ruleForm.userData.cellPhone" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Email" prop="userData.userEmail">
          <el-input type="email" v-model="ruleForm.userData.userEmail" />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- Información laboral -->
    <div class="flex items-center my-6">
      <div class="flex-grow border-t border-gray-300"></div>
      <span class="mx-4 font-bold">Información laboral</span>
      <div class="flex-grow border-t border-gray-300"></div>
    </div>

    <el-row :gutter="30">
      <el-col :span="8">
        <el-form-item label="Salario" prop="salary">
          <el-input-number
            style="width: 100%"
            :min="0"
            v-model="ruleForm.salary"
            :step="1"
          ></el-input-number>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Departamento" prop="divisionId">
          <el-select
            v-model="ruleForm.divisionId"
            placeholder="Seleccione el departamento"
          >
            <el-option label="Finanzas" :value="1" />
            <el-option label="RRHH" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Cargo" prop="jobTitleId">
          <el-select
            v-model="ruleForm.jobTitleId"
            placeholder="Seleccione el cargo"
          >
            <el-option label="Gerente" :value="1" />
            <el-option label="Analista" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="8">
        <el-form-item
          label="Tipo de contrato"
          prop="contractData.contractTypeId"
        >
          <el-select
            v-model="ruleForm.contractData.contractTypeId"
            placeholder="Seleccione el tipo de contrato"
          >
            <el-option label="Contrato A Término Fijo" :value="1" />
            <el-option label="Contrato A Término Indefinido" :value="2" />
            <el-option label="Contrato De Obra O Labor" :value="3" />
            <el-option
              label="Contrato Civil Por Prestacion De Servicios"
              value="4"
            />
            <el-option label="Contrato De Pasantia" value="5" />
            <el-option label="Contrato Ocasional De Trabajo" value="6" />
            <el-option label="Contrato" value="7" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          label="Fecha de inicio"
          prop="contractData.contractStartDate"
        >
          <el-date-picker
            v-model="ruleForm.contractData.contractStartDate"
            type="date"
            aria-label="Seleccione una fecha"
            placeholder="Seleccione una fecha"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Fecha de fin" prop="contractData.contractEndDate">
          <el-date-picker
            v-model="ruleForm.contractData.contractEndDate"
            type="date"
            aria-label="Seleccione una fecha"
            placeholder="Seleccione una fecha"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- Seguridad Social -->
    <div class="flex items-center my-6">
      <div class="flex-grow border-t border-gray-300"></div>
      <span class="mx-4 font-bold">Seguridad Social</span>
      <div class="flex-grow border-t border-gray-300"></div>
    </div>

    <el-row :gutter="30">
      <el-col :span="12">
        <el-form-item label="EPS" prop="epsData.epsId">
          <el-select
            v-model="ruleForm.epsData.epsId"
            placeholder="Seleccione la EPS"
          >
            <el-option label="Sura" :value="1" />
            <el-option label="Sanitas" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="Tipo de EPS" prop="epsData.epsTypeId">
          <el-select
            v-model="ruleForm.epsData.epsTypeId"
            placeholder="Seleccione el tipo"
          >
            <el-option label="Contributivo" :value="1" />
            <el-option label="Subsidiado" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="12">
        <el-form-item label="ARL" prop="arlData.arlId">
          <el-select
            v-model="ruleForm.arlData.arlId"
            placeholder="Seleccione la ARL"
          >
            <el-option label="Sura" :value="1" />
            <el-option label="Colpatria" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="Riesgo" prop="arlData.riskId">
          <el-input-number
            style="width: 100%"
            :min="0"
            :max="5"
            v-model="ruleForm.arlData.riskId"
            :step="1"
          ></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="12">
        <el-form-item label="Fondo de pensiones" prop="arlData.arlId">
          <el-select
            v-model="ruleForm.pensionFundInfoData.pensionFundId"
            placeholder="Seleccione el fondo"
          >
            <el-option label="Porvenir" :value="1" />
            <el-option label="Colpatria" :value="2" />
            <el-option label="Protección" :value="3" />
            <el-option label="BBVA" :value="4" />
            <el-option label="Suramericana" :value="5" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="Tipo de fondo de pensión" prop="arlData.riskId">
          <el-select
            v-model="ruleForm.pensionFundInfoData.pensionFundTypeId"
            placeholder="Seleccione el tipo"
          >
            <el-option label="Contributivo" :value="1" />
            <el-option label="Subsidiado" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="12">
        <el-form-item
          label="Caja de compensación"
          prop="familyCompensationFundId"
        >
          <el-select
            v-model="ruleForm.familyCompensationFundId"
            placeholder="Seleccione la caja"
          >
            <el-option label="Compensar" :value="1" />
            <el-option label="Colsubsidio" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item
          label="Fondo de cesantías"
          prop="severanceFundId"
        >
          <el-select
            v-model="ruleForm.severanceFundId"
            placeholder="Seleccione el fondo"
          >
            <el-option label="Compensar" :value="1" />
            <el-option label="Colsubsidio" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- Bonificaciones -->
    <div class="flex items-center my-6">
      <div class="flex-grow border-t border-gray-300"></div>
      <span class="mx-4 font-bold">Bonificaciones</span>
      <div class="flex-grow border-t border-gray-300"></div>
    </div>

    <el-row :gutter="30">
      <el-col :span="8">
        <el-form-item
          label="Fecha de inicio"
          prop="bonificationData.activeBonusDate"
        >
          <el-date-picker
            v-model="ruleForm.bonificationData.activeBonusDate"
            type="date"
            placeholder="Seleccione una fecha"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item
          label="Fecha de fin"
          prop="bonificationData.activeBonusDate"
        >
          <el-date-picker
            v-model="ruleForm.bonificationData.bonusEndDate"
            type="date"
            placeholder="Seleccione una fecha"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Valor" prop="bonificationData.bonificationValue">
          <el-input-number
            style="width: 100%"
            :min="0"
            v-model="ruleForm.bonificationData.bonificationValue"
            :step="1"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- Beneficios-->
    <div class="flex items-center my-6">
      <div class="flex-grow border-t border-gray-300"></div>
      <span class="mx-4 font-bold">Beneficios</span>
      <div class="flex-grow border-t border-gray-300"></div>
    </div>

    <el-row :gutter="30">
      <el-col :span="10">
        <el-form-item label="Beneficios" prop="benefits">
          <el-select
            v-model="ruleForm.newBenefit.benefitId"
            placeholder="Seleccione el beneficio"
          >
            <el-option
              v-for="benefit in benefitsOptions"
              :key="benefit.id"
              :label="benefit.name"
              :value="benefit.id"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="Valor" prop="benefits">
          <el-input-number
            style="width: 100%"
            :min="0"
            v-model="ruleForm.newBenefit.valueBenefits"
            :step="1"
          />
        </el-form-item>
      </el-col>

      <el-col :span="4">
        <div class="h-full flex items-center justify-start m-1">
          <el-button type="primary" class="w-full" @click="addBenefit"
            >Agregar</el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="24">
        <ul>
          <li
            v-for="(benefit, index) in ruleForm.benefits"
            :key="index"
            class="flex justify-between items-center py-2"
          >
            <span>
              {{
                benefitsOptions.find((b) => b.id === benefit.benefitId)?.name
              }}
              -
              {{ benefit.valueBenefit }}
            </span>
            <button
              type="button"
              @click="removeBenefit(index)"
              class="text-red-500"
            >
              Eliminar
            </button>
          </li>
        </ul>
      </el-col>
    </el-row>

    <el-form-item class="mt-6">
      <el-button
        :loading="isLoading"
        type="success"
        @click="submitForm(ruleFormRef)"
      >
        Enviar Solicitud
      </el-button>
      <el-button type="danger" @click="resetForm(ruleFormRef)"
        >Reiniciar formulario</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useEmployeeStore } from "../../../stores/employee.store";
import { onMounted, reactive, ref } from "vue";
import type { ComponentSize, FormInstance, UploadUserFile } from "element-plus";

const isLoading = ref(false);
const { employeeRequestForm, createEmployeeRequest } = useEmployeeStore();

// Lista de opciones de beneficios disponibles
const benefitsOptions = [
  { id: 1, name: "Prima de Servicios" },
  { id: 2, name: "Auxilio de Transporte" },
  { id: 3, name: "Bono de Alimentación" },
  { id: 4, name: "Seguro Médico Complementario" },
  { id: 5, name: "Beca de Estudios" },
];

const ruleForm = employeeRequestForm;

// Método para agregar un beneficio
const addBenefit = () => {
  if (
    ruleForm.newBenefit.benefitId &&
    Number(ruleForm.newBenefit.valueBenefits) > 0
  ) {
    ruleForm.benefits.push({
      benefitId: Number(ruleForm.newBenefit.benefitId),
      valueBenefit: Number(ruleForm.newBenefit.valueBenefits),
    });

    // Limpiar los valores después de agregar
    ruleForm.newBenefit.benefitId = "";
    ruleForm.newBenefit.valueBenefits = "";
  } else {
    alert("Seleccione un beneficio y asigne un valor mayor a 0.");
  }
};

// Método para eliminar un beneficio
const removeBenefit = (index: number) => {
  ruleForm.benefits.splice(index, 1);
};

const fileList = ref<UploadUserFile[]>([]);

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();

const rules = reactive({
  userData: {
    numberDocument: [
      {
        required: true,
        message: "El número de documento es obligatorio",
        trigger: "blur",
      },
    ],
    userFirstName: [
      {
        required: true,
        message: "El primer nombre es obligatorio",
        trigger: "blur",
      },
    ],
    surName: [
      {
        required: true,
        message: "El primer apellido es obligatorio",
        trigger: "blur",
      },
    ],
    birthday: [
      {
        required: true,
        message: "La fecha de nacimiento es obligatoria",
        trigger: "blur",
      },
    ],
    cellPhone: [
      { required: true, message: "El celular es obligatorio", trigger: "blur" },
    ],
    address: [
      {
        required: true,
        message: "La dirección es obligatoria",
        trigger: "blur",
      },
    ],
  },
  salary: [
    { required: true, message: "El salario es obligatorio", trigger: "blur" },
  ],
  divisionId: [
    {
      required: true,
      message: "Debe seleccionar un departamento",
      trigger: "change",
    },
  ],
  jobTitleId: [
    { required: true, message: "Debe seleccionar un cargo", trigger: "change" },
  ],
  epsData: {
    epsId: [
      {
        required: true,
        message: "Debe seleccionar una EPS",
        trigger: "change",
      },
    ],
  },
  arlData: {
    arlId: [
      {
        required: true,
        message: "Debe seleccionar una ARL",
        trigger: "change",
      },
    ],
  },
  bloodTypeId: [
    { required: true, message: "El tipo de sangre es obligatorio" },
  ],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    isLoading.value = true;
    console.log("Entra: " + isLoading.value);

    const valid = await formEl.validate();
    if (valid) {
      await createEmployeeRequest();
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  } finally {
    isLoading.value = false;
    console.log("Sale: " + isLoading.value);
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  removeBenefit(0);
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));

onMounted(() => {
  removeBenefit(0);
});
</script>
