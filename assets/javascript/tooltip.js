export default class Tooltip {
    // Public Fields
    showEvents = ['mouseenter', 'focus'];
    hideEvents = ['mouseleave', 'blur'];

    // Private Fields
    #popperInstance = null;

    constructor(button, tooltipContainer, direction = 'left') {
        this.button = button;
        this.tooltipContainer = tooltipContainer;
        this._direction = direction;
    }

    createTooltip() {
        this.#popperInstance = Popper.createPopper(this.button, this.tooltipContainer, {
            placement: this.direction,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });
    }

    destroyTooltip() {
        if (this.#popperInstance) {
            this.#popperInstance.destroy();
            this.#popperInstance = null;
        }
    }

    // Getter / Setter
    get direction() {
        return this._direction;
    }

    set direction(direction) {
        this._direction = direction;
    }
}