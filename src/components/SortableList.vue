<template>
  <v-container fluid class="wrapper">
    <v-row>
      <v-col>
        <drop-list :items="items" class="list" @insert="onInsert" @reorder="$event.apply(items)">
          <template #item="{ item }">
            <drag class="" :key="item"
              ><v-card>
                <h1>
                  {{ item }}
                </h1>
              </v-card>
            </drag>
          </template>
          <!-- <template #feedback="{ data }">
            <div class="item feedback" :key="data">{{ data }}</div>
          </template> -->
        </drop-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Drag, DropList, InsertEvent } from "vue-easy-dnd"

export default {
  // @TODO: Make this class style
  name: "SortableList",
  components: {
    Drag,
    DropList
  },
  data: function() {
    return {
      items: ["a", "b", "c", "d", "e"]
    }
  },
  methods: {
    onInsert(event: InsertEvent) {
      this.items.splice(event.index, 0, event.data)
    }
  }
}
</script>

<style lang="scss">
html,
body,
#app,
.v-application--wrap,
.v-content,
.v-content__wrap {
  height: 100%;
}

.drop-in {
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.3);
}
</style>

<style scoped lang="scss">
.wrapper {
  .list {
    border: 1px solid black;
    margin: 100px auto;
    width: 200px;

    .item {
      padding: 20px;
      margin: 10px;
      background-color: rgb(220, 220, 255);
      display: flex;
      align-items: center;
      justify-content: center;

      &.feedback {
        background-color: rgb(255, 220, 220);
        border: 2px dashed black;
      }

      &.drag-image {
        background-color: rgb(220, 255, 220);
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>