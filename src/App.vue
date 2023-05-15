<template>
  <section class="py-8">
    <div class="container mx-auto text-center">
      <h1 class="text-4xl">次に生まれる国占い</h1>
      <div class="flex flex-col-reverse gap-4">
        <div class="card bg-base-100 shadow-xl select-none"
          v-for="countryDrew, index in countriesDrew" :key="countryDrew.name">
          <div class="card-body text-left">
            <h2 class="card-title">{{ countryDrew.name }} ({{ index + 1 }})</h2>
            <p>人口: {{ countryDrew.population * 1000 }}</p>
            <p>確率: {{ countryDrew.population / 8000000 * 100 }}%</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" @click="draw">もう一度</button>
            </div>
          </div>
        </div>
      </div>
      <div :class="`tooltip fixed bottom-4 ${isLoaded ? '' : 'tooltip-open'}`"
        :data-tip="isLoaded ? '試す' : 'ロード中...'">
        <button :disabled="!isLoaded" @click="draw" class="btn">試す</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      countries: [],
      probas: [],
      countriesDrew: [],
      isLoaded: false
    }
  },
  methods: {
    async fetchCountryPopulations() {
      const promises = [];

      for (let i = 1; i < 2000000000; i = i * 10) {
        promises.push(
          fetch(`https://api.api-ninjas.com/v1/country?limit=100&min_population=${i / 10}&max_population=${i}`, {
            headers: {
              "X-Api-Key": "nPvHr9J0kRSC3/+5xNDZWA==aD2DSR6c4GXHUmAB",
              "Accept-Encoding": "gzip"
            }
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              } else {
                throw new Error("error");
              }
            })
        );
      }

      const results = await Promise.all(promises);
      results.map(data => {
        this.countries.push(...data);
      });
    },
    randexec(arr, probas) {
      var array = [];
      var i, sum = 0;

      for (i = 0; i < probas.length - 1; i++) {
        sum += (probas[i]);
        array[i] = sum;
        console.log(array);
      }

      var random = Math.random();
      console.log(random);

      for (i = 0; i < array.length && random >= array[i]; i++);

      return arr[i];
    },
    draw() {
      this.countriesDrew.push(
        this.randexec(
          this.countries, this.probas
        )
      );
    }
  },
  async mounted() {
    await this.fetchCountryPopulations();

    this.isLoaded = true;

    this.countries.map(country => {
      this.probas.push(country.population / 8000000);
    });
  }
};
</script>
