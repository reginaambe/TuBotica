Vue.component('search-select', {
  template: '#search-select',

  props: {
    value: {
      required: true
    },
    options: {
      required: true,
      type: Array
    },
    filterFunction: {
      type: Function,
      default: function (search, options) {
        return options.filter(option => {
          return option.toLowerCase().startsWith(search.toLowerCase());
        });
      }
    }
  },

  data() {
    return {
      isOpen: false,
      search: '',
      highlightedIndex: 0
    }
  },

  computed: {
    filteredOptions() {
      return this.filterFunction(this.search, this.options);
    }
  },

  mounted() {
    document.addEventListener('click', this.clickOutside);
  },

  beforeDestroy() {
    document.removeEventListener('click', this.clickOutside);
  },

  methods: {
    defaultFilter(search, options) {
      return options.filter(option => {
        return option.toLowerCase().startsWith(search.toLowerCase());
      });
    },

    clickOutside(e) {
      if (e.target === this.$el || this.$el.contains(e.target)) {
        return;
      }

      this.close();
    },

    open() {
      this.isOpen = true;

      this.$nextTick(() => {
        this.$refs.search.focus();
        this.scrollToHighlighted();
      })
    },

    close() {
      this.isOpen = false;
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    select(selected) {
      this.$emit('input', selected);
      this.search = '';
      this.highlightedIndex = 0;
      this.close();
    },

    selectClicked(e) {
      this.select(e.target.innerText);
    },

    selectHighlighted(e) {
      if (this.isOpen) {
        this.select(this.filteredOptions[this.highlightedIndex]);
      } else {
        this.open();
      }
    },

    scrollToHighlighted() {
      this.$refs.options.children[this.highlightedIndex].scrollIntoView({ block: 'nearest' });
    },

    highlight(index) {
      this.highlightedIndex = index;

      if (this.highlightedIndex < 0) {
        this.highlightedIndex = this.filteredOptions.length - 1;
      }

      if (this.highlightedIndex > this.filteredOptions.length - 1) {
        this.highlightedIndex = 0;
      }

      this.scrollToHighlighted();
    },

    highlightPrev() {
      if (this.isOpen) this.highlight(this.highlightedIndex -= 1);
    },

    highlightNext() {
      if (this.isOpen) this.highlight(this.highlightedIndex += 1);
    },

    highlightOption(e) {

      // Find the index of the highlighted option
      var node = e.target
      var index = 0;
      while ((node = node.previousElementSibling)) {
        index++;
      }
      // return index;
      this.highlightedIndex = index;

      // Remove the old active class if one exists
      const old = this.$el.querySelector('.is-active')
      if (old) old.classList.remove('is-active');
      // Add it to the newly hovered item
      e.target.classList.add('is-active');
    }

  }

});

const app = new Vue({
  el: '#app',

  data() {
    return {
      selectedItem: null,
      bands: [
        'Indigestión',
        'Tos',
        'Dolor muscular',
        'Estómago',
        'Quemaduras',
        'Gripe',
      ]
    }
  }

});

var button = document.getElementById("Sailthru");

button.addEventListener("click", function(){
    document.location.href = 'http://www.sailthru.com';
});