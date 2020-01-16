window.addEventListener('DOMContentLoaded', () => {

	const canvas = document.getElementById('canvas')
	const engine = new BABYLON.Engine(canvas, true)

	const canvasSetup = (canvas) => {
		canvas.width = 900
		canvas.height = 600
	}
	canvasSetup(canvas)


	const createScene = () => {
		const scene = new BABYLON.Scene(engine)

		// const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 10, -10), scene)
		
		const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
		
		const box = BABYLON.MeshBuilder.CreateBox('box', {height: 4, width: 4}, scene)
		box.position = new BABYLON.Vector3(1, 2, 1)

		const box2 = BABYLON.MeshBuilder.CreateBox('box2', {height: 4, width: 4}, scene)
		const material = new BABYLON.StandardMaterial("material1", scene)
		material.wireframe = true
		box2.material = material
		box2.position = new BABYLON.Vector3(0, 5, 0)

		const camera = new BABYLON.ArcRotateCamera("arcCamera",
		BABYLON.Tools.ToRadians(45),
		BABYLON.Tools.ToRadians(45),
		10.0, box.position, scene
		)
		camera.attachControl(canvas, true)

		camera.keysUp.push(87)
		camera.keysDown.push(83)
		camera.keysLeft.push(65)
		camera.keysRight.push(68)

		const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments: 16, diameter: 2}, scene)
		sphere.position.y = 1

		const ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:6, width: 6, subdivisions: 2}, scene)
	
		return scene
	}

	const scene = createScene()

	// Game Main Loop
	// Ticker function default 60fps
	engine.runRenderLoop(() => {
		scene.render()
	})
	window.addEventListener('resize', () => {
		engine.resize()
	})
});