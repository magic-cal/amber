<template>
  <v-container pa-0>
    <v-row>
      <v-col class="mt-6">
        <v-data-table
          disable-pagination
          @click:row="rowClicked"
          :headers="headers"
          :items="resources"
          item-key="id.toString()"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    <v-footer fixed
      ><v-row>
        <v-col align="right"><v-btn @click="createNew">Create New</v-btn></v-col></v-row
      ></v-footer
    >
  </v-container>
</template>

<script lang="ts">
import api from "@/api/api"
import { WithLoading } from "@/store/modules/appStore"
import { Resource, ResourceReadonly } from "@/../utils/classes/resources"
import Vue from "vue"
import { Component } from "vue-property-decorator"
@Component
export default class ListResources extends Vue {
  resources: Resource[] = []

  headers = [
    {
      text: this.$t("resource_name"),
      align: "start",
      sortable: true,
      value: "name"
    },
    {
      text: this.$t("resource_tags"),
      align: "start",
      sortable: false,
      value: "readOnly.tagList"
    }
  ]

  rowClicked(rowItem: Resource) {
    this.$router.push({
      name: "EditResource",
      params: { resourceId: rowItem.id.value }
    })
  }

  createNew() {
    this.$router.push({
      name: "EditResource"
    })
  }

  @WithLoading
  async created() {
    this.resources = await api.resourceApi.getResourcesByFilter({})
    this.resources.forEach((resource) => {
      resource.readOnly = new ResourceReadonly(resource.tags)
    })
  }
}
</script>
