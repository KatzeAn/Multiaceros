<template>
  <el-card class="organigrama-container">
    <h2 class="text-lg font-bold text-center">Mi equipo</h2>
    <el-tree :data="treeData" :props="defaultProps" node-key="id" highlight-current>
      <template #default="{ node, data }">
        <div class="node-content">
          <el-avatar :size="30" icon="User" />
          <div class="info">
            <strong>{{ node.label }}</strong>
            <small>{{ data.role }}</small>
          </div>
        </div>
      </template>
    </el-tree>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { User } from "@element-plus/icons-vue";

const treeData = ref([
  { id: 1, label: "CEO", role: "Director General", email: "ceo@empresa.com", children: [
      { id: 2, label: "Gerente de Ventas", role: "Ventas", email: "ventas@empresa.com", children: [
        { id: 4, label: "Ejecutivo de Ventas", role: "Ventas", email: "ejecutivo@empresa.com" }
      ] },
      { id: 3, label: "Gerente de Tecnología", role: "TI", email: "tech@empresa.com", children: [
        { id: 5, label: "Desarrollador", role: "TI", email: "dev@empresa.com" }
      ] }
    ] }
]);

const defaultProps = { label: "label", children: "children" };
</script>

<style scoped>
.organigrama-container {
  max-width: 1000px;
  width: 100%;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.node-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.node-content:hover {
  background-color: #e3f2fd;
}

.info {
  flex-grow: 1;
}
</style>
