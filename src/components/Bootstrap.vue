<template>
  <div id="content">
    <div id="app">
      <b-navbar type="light" variant="light">
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
            <!-- b-dropdown-item href="#">Ausloggen</b-dropdown-item -->
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
      <hr>

      <div>
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-file" label="Verbund:" label-for="verbund-name">
            <b-form-select
              id="verbund-name"
              v-model="form.verbund"
              :options="form.verbuende"
              :disabled="form.verbuende.length === 1"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-file" label="TXT-Datei:" label-for="txt-file">
            <b-form-select
              id="txt-file"
              v-model="form.file"
              :options="filesByVerbund"
              required
              :disabled="form.verbund === ''"
            ></b-form-select>
          </b-form-group>
          <span class="text-muted">&#160;{{lastChange}}</span>
          <hr>
          <b-button type="submit" :disabled="form.file.length === 0" variant="primary">Konvertieren</b-button>
        </b-form>
      </div>

      <hr>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/de";

export default {
  name: "Bootstrap",
  data() {
    return {
      subTitle: "DigiVerbund - MapInfo-CSV-Konverter",
      form: {
        file: "",
        verbund: "",
        files: {
          undefined: [{ value: "", text: "Bitte TXT-Datei auswählen" }]
        },
        verbuende: [{ value: "", text: "Bitte Verbund auswählen" }]
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
      let entries = this.form.files["undefined"];
      if (this.form.verbund === "") {
        return entries;
      } else {
        let key = this.form.verbund;
        return entries.concat(this.form.files[key]);
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
    this.form.files = { ...getTxtFiles(), ...this.form.files };
    this.form.verbuende = this.form.verbuende.concat(getVerbuende());
  }
};

function getVerbuende() {
  return [{ value: "avv", text: "avv" }, { value: "rmv", text: "rmv" }];
}

function getTxtFiles() {
  return {
    avv: [
      {
        value: { name: "avv1.txt", lastchange: "2020-05-02 12:32" },
        text: "avv1.txt"
      },
      {
        value: { name: "avv2.txt", lastchange: "2020-04-01 11:55" },
        text: "avv2.txt"
      }
    ],
    rmv: [
      {
        value: { name: "rmv1.txt", lastchange: "2020-05-29 08:14" },
        text: "rmv1.txt"
      },
      {
        value: { name: "rmv2.txt", lastchange: "2020-05-28 16:09" },
        text: "rmv2.txt"
      }
    ]
  };
}
</script>

<style scoped src="bootstrap/dist/css/bootstrap.min.css"></style>
<style scoped src="bootstrap-vue/dist/bootstrap-vue.css"></style>
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
