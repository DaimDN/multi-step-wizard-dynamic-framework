    import { Fragment } from "react"
    import {  Alert, Space  } from 'antd';


      /**
       * The above function is a TypeScript React component that renders an error message with the provided
       * error props.
       * @param {any} props - The `props` parameter is an object that contains the properties passed to the
       * `ErrorFragment` component. These properties can be accessed using dot notation, such as
       * `props.errors`.
       * @returns The ErrorFragment component is returning a JSX fragment containing a Space component and an
       * Alert component. The Alert component displays an error message with the value of the `props.errors`
       * prop.
       */
    const ErrorFragment = (props: any) =>{
        return <Fragment>
        <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
        >
        <Alert
          message="Error"
          description={`${props.errors.toString()}`}
          type="error"
        />
        </Space>
        </Fragment>
    }

      /* The line `export default ErrorFragment;` is exporting the `ErrorFragment` component as the default
      export of the module. This means that when another module imports this module, they can import the
      `ErrorFragment` component using the default import syntax, like this: `import ErrorFragment from
      './ErrorFragment'`. */
      export default ErrorFragment;