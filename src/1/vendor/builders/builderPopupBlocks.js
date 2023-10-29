class BuilderPopupBlocks {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    build(component, block_id) {
        const data_block = this.getDataBlock(component, block_id)

        switch (data_block.component) {
            case 'c-container':
                break

            case 'c-form':
                break

            case 'c-image':
                data_block.html = this.createImage()
                break

            case 'c-video':
                break
            
            case 'c-button':
                break

            default:
                break;
        }

        return data_block
    }

    getDataBlock(component, block_id) {
        const obj = {
            id: block_id,
            component: component,
            content: '',
            version: 1,
            html: '',
            style: {prop: ''},
            params: {prop: ''}
        }

        if (component === 'c-container') obj.blocks = []

        return obj
    }

    createImage() {
        return ''
        return '<img src="{{ block[\'content\'] }}">'
    }
}

export { BuilderPopupBlocks }