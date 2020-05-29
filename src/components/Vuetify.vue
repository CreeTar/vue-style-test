<template>
  <v-app>
    <v-content>
      <v-container>
        <!-- b-navbar type="light" variant="light">
        <b-navbar-brand href="#">
          <span class="logo">&#x1f68a;</span>
          <span class="logoleft">OEV</span>
          <span class="logoright">Tools</span>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <div>{{ subTitle }}</div>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <b-avatar class="ml-2" title="Test-User"></b-avatar>
            </template>
            <b-dropdown-item href="#">Ausloggen</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-navbar-->
        <v-form>
          <v-autocomplete
            label="Verbund auswählen"
            v-model="form.verbund"
            :items="this.form.verbuende"
            :disabled="form.verbuende.length === 0"
            required
          ></v-autocomplete>

          <v-select
            label="TXT-Datei auswählen"
            v-model="form.file"
            :items="filesByVerbund"
            item-text="name"
            :disabled="form.verbund === ''"
            required
            return-object
          ></v-select>

          <v-alert dense text type="info">&#160;{{lastChange}}</v-alert>

          <v-btn
            large
            color="primary"
            :disabled="form.file.length === 0"
            @click="onSubmit"
          >Konvertieren</v-btn>
        </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import moment from "moment";
import "moment/locale/de";

export default {
  name: "Vuetify",
  data() {
    return {
      subTitle: "DigiVerbund - MapInfo-CSV-Konverter",
      form: {
        file: "",
        verbund: "",
        files: {},
        verbuende: []
      }
    };
  },
  watch: {
    filesByVerbund: {
      handler: function() {
        this.form.file = "";
      }
    }
  },
  computed: {
    lastChange() {
      if (this.form.file !== "") {
        let time = moment(this.form.file.lastchange, "YYYY-MM-DD hh:mm");
        return (
          "Letzte Änderung: " +
          time.from(moment()) +
          " am " +
          this.form.file.lastchange
        );
      } else {
        return "";
      }
    },
    filesByVerbund() {
      if (this.form.verbund !== "") {
        let key = this.form.verbund;
        return this.form.files[key];
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form.file.name));
    }
  },
  created() {
    moment.locale("de");
    this.$emit("send", this.subTitle);
    this.form.files = getTxtFiles();
    this.form.verbuende = getVerbuende();
  }
};

function getVerbuende() {
  return ["avv", "rmv"];
}

function getTxtFiles() {
  return {
    avv: [
      { name: "avv1.txt", lastchange: "2020-05-02 12:32" },
      { name: "avv2.txt", lastchange: "2020-04-01 11:55" }
    ],
    rmv: [
      { name: "rmv1.txt", lastchange: "2020-05-29 08:14" },
      { name: "rmv2.txt", lastchange: "2020-05-28 16:09" }
    ]
  };
}
</script>
 
<style src="vuetify/dist/vuetify.min.css"></style>
<style scoped>
.logo {
  font-size: 20pt;
}
.logoleft {
  font-size: 25pt;
  font-weight: 900;
  color: red;
}
.logoright {
  font-size: 25pt;
  font-weight: 600;
  color: #FF6666;
}

#content {
  text-align: center;
}
</style>
