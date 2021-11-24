<script>
function randomString(length) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '1234567890';
  const charset = `${letters}${letters.toUpperCase()}${numbers}`;

  const randomCharacter = (character) =>
    character[Math.floor(Math.random() * character.length)];

  let R = '';
  for (let i = 0; i < length; i++) {
    R += randomCharacter(charset);
  }

  return R;
}

import { h } from 'vue';

let id = 1;

/**
 * Remove false attrs
 * @param {Object} attrs
 */
function filterAttrs(attrs) {
  return Object.keys(attrs).reduce((result, key) => {
    if (
      attrs[key] !== false &&
      attrs[key] !== null &&
      attrs[key] !== undefined
    ) {
      result[key] = attrs[key];
    }
    return result;
  }, {});
}

export function removeProperties(input, ...filter) {
  const output = {};

  for (const key in input) {
    if ({}.hasOwnProperty.call(input, key)) {
      if (!filter.includes(key)) {
        output[key] = input[key];
      }
    }
  }

  return output;
}

export default {
  name: 'InlineSvg',
  inheritAttrs: false,
  render() {
    if (!this.svgElSource) {
      return null;
    }

    const svgAttrs = {
      ...this.getSvgAttrs(this.svgElSource),
      ...filterAttrs(this.$attrs),
      innerHTML: this.getSvgContent(this.svgElSource),
      id: id,
    };

    const elementProps = removeProperties(
      svgAttrs,
      'baseURL',
      'cacheRequests',
      'children',
      'description',
      'fetchOptions',
      'innerRef',
      'loader',
      'onError',
      'onLoad',
      'preProcessor',
      'src',
      'title',
      'uniqueHash',
      'uniquifyIDs'
    );

    id += 1;

    return h('svg', elementProps);
  },
  props: {
    src: {
      type: String,
      default: null,
    },
    svg: {
      type: String,
      default: null,
    },
    preProcessor: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      /** @type SVGElement */
      svgElSource: null,
      hash: randomString(10),
    };
  },
  watch: {
    src(newValue) {
      // re-generate cached svg (`svgElSource`)
      this.getSource(newValue);
    },
    svg(newValue) {
      console.log('svgContent changed');
      this.setSource(newValue);
    },
  },
  mounted() {
    // generate `svgElSource`
    if (this.src) {
      this.getSource(this.src);
    } else if (this.svg) {
      console.log('setting svg');
      this.setSource(this.svg);
    }
  },
  methods: {
    updateSVGAttributes(node) {
      const baseURL = '';
      const replaceableAttributes = [
        'id',
        'href',
        'xlink:href',
        'xlink:role',
        'xlink:arcrole',
      ];
      const linkAttributes = ['href', 'xlink:href'];
      const isDataValue = (name, value) =>
        linkAttributes.indexOf(name) >= 0 &&
        (value ? value.indexOf('#') < 0 : false);

      [...node.children].map((d) => {
        if (d.attributes && d.attributes.length) {
          const attributes = Object.values(d.attributes).map((a) => {
            const attr = a;
            const match = a.value.match(/url\((.*?)\)/);

            if (match && match[1]) {
              attr.value = a.value.replace(
                match[0],
                `url(${baseURL}${match[1]}__${this.hash})`
              );
            }

            return attr;
          });

          replaceableAttributes.forEach((r) => {
            const attribute = attributes.find((a) => a.name === r);

            if (attribute && !isDataValue(r, attribute.value)) {
              attribute.value = `${attribute.value}__${this.hash}`;
            }
          });
        }

        if (d.children.length) {
          return this.updateSVGAttributes(d);
        }

        return d;
      });

      return node;
    },
    getSvgAttrs(svgEl) {
      // copy attrs
      let svgAttrs = {};
      const attrs = svgEl.attributes;
      if (!attrs) {
        return svgAttrs;
      }
      for (let i = attrs.length - 1; i >= 0; i--) {
        svgAttrs[attrs[i].name] = attrs[i].value;
      }
      return svgAttrs;
    },
    getSvgContent(svgEl) {
      const node = svgEl.cloneNode(true);
      // copy inner html

      const preProcessor = this.preProcessor;
      if (preProcessor) {
        return preProcessor(node.innerHTML);
      }
      return node.innerHTML;
    },
    /**
     * Get svgElSource
     * @param {string} src
     */
    async getSource(src) {
      try {
        const svg = await this.download(src);
        // inline svg when cached promise resolves
        const element = this.updateSVGAttributes(svg);
        this.svgElSource = element;
      } catch (error) {
        console.log('failed to load: ', src);
      }
    },
    /**
     * Get svgElSource
     * @param {string} src
     */
    async setSource(svg) {
      try {
        const parser = new DOMParser();
        const result = parser.parseFromString(svg, 'text/xml');
        let svgEl = result.getElementsByTagName('svg')[0];
        const element = this.updateSVGAttributes(svgEl);
        this.svgElSource = element;
      } catch (error) {
        console.log('failed to load: ', svg);
        console.log(error);
      }
    },

    /**
     * Get the contents of the SVG
     * @param {string} url
     * @returns {Promise<Element>}
     */
    async download(url) {
      try {
        const response = await fetch(url);

        // Setup a parser to convert the response to text/xml in order for it to be manipulated and changed
        const text = await response.text();
        const parser = new DOMParser();
        const result = parser.parseFromString(text, 'text/xml');

        let svgEl = result.getElementsByTagName('svg')[0];
        if (!svgEl) {
          throw new Error('Loaded file is not valid SVG');
        }
        return svgEl;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
